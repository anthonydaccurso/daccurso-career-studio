import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { PDFDocument } from "npm:pdf-lib";
import mammoth from "npm:mammoth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://daccursocareerstudio.com",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, apikey",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const { file_name, file_data, file_size } = await req.json();

    if (!file_data) {
      return new Response(JSON.stringify({ error: "Missing file data." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Decode base64 to binary
    const base64Data = file_data.split(",")[1];
    const fileBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    let resumeText = "";

    if (file_name.endsWith(".pdf")) {
      // Extract text from PDF
      const pdfDoc = await PDFDocument.load(fileBytes);
      const pages = pdfDoc.getPages();
      resumeText = pages.map((p) => p.getTextContent?.() || "").join("\n");
    } else if (file_name.endsWith(".docx")) {
      // Extract text from DOCX
      const result = await mammoth.extractRawText({ buffer: fileBytes });
      resumeText = result.value;
    } else {
      return new Response(JSON.stringify({ error: "Unsupported file type. Upload DOCX or PDF only." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(JSON.stringify({ error: "Extracted text too short or unreadable." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) throw new Error("Missing OpenAI API key");

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert hiring manager and resume reviewer. Analyze resumes and provide detailed, actionable feedback on formatting, content, and overall presentation. Avoid markdown syntax.",
        },
        {
          role: "user",
          content: `Please analyze this resume and provide detailed feedback under these sections:
1. Overall Impression (score out of 10)
2. Formatting & Layout
3. Content Quality
4. ATS Optimization
5. Key Strengths
6. Areas for Improvement
7. Specific Recommendations

Resume:
${resumeText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1800,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI error:", err);
      throw new Error("OpenAI request failed.");
    }

    const data = await response.json();
    const feedback = data?.choices?.[0]?.message?.content || "No feedback generated.";

    // Save file + feedback into Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/ai_resume_feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey!,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        file_name,
        file_size,
        ai_feedback: feedback,
        bucket_name: "feedback",
        file_path: `feedback/${file_name}`,
      }),
    });

    return new Response(JSON.stringify({ feedback }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analyze Resume Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});