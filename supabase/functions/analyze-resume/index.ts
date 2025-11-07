import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import mammoth from "npm:mammoth";
import pdfParse from "npm:pdf-parse";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://daccursocareerstudio.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, X-Client-Info",
  "Access-Control-Max-Age": "86400",
};

// 1. Handle CORS preflight cleanly before anything else
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    // 2. Parse input
    const { file_name, file_data, file_size } = await req.json();
    if (!file_data) {
      return new Response(JSON.stringify({ error: "Missing file data." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Decode base64
    const base64Data = file_data.split(",")[1];
    const fileBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    // 4. Extract text (DOCX / PDF)
    let resumeText = "";
    if (file_name.toLowerCase().endsWith(".pdf")) {
      const parsed = await pdfParse(fileBytes);
      resumeText = parsed.text;
    } else if (file_name.toLowerCase().endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer: fileBytes });
      resumeText = result.value;
    } else {
      return new Response(JSON.stringify({ error: "Only DOCX or PDF files supported." }), {
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

    // 5. AI feedback
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) throw new Error("Missing OpenAI API key.");

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert resume reviewer. Provide detailed, professional feedback in plain text (no markdown).",
          },
          {
            role: "user",
            content: `Analyze this resume under:
1. Overall Impression (score)
2. Formatting & Layout
3. Content Quality
4. ATS Optimization
5. Strengths
6. Areas for Improvement
7. Recommendations

Resume:
${resumeText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1800,
      }),
    });

    if (!aiRes.ok) {
      const err = await aiRes.text();
      console.error("OpenAI API error:", err);
      throw new Error("OpenAI API request failed.");
    }

    const data = await aiRes.json();
    const feedback = data?.choices?.[0]?.message?.content || "No feedback generated.";

    // 6. Save file + record
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseKey) throw new Error("Missing Supabase credentials.");

    const filePath = `feedback/${file_name}`;
    const upload = await fetch(`${supabaseUrl}/storage/v1/object/feedback/${filePath}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
        "Content-Type": "application/octet-stream",
      },
      body: fileBytes,
    });

    if (!upload.ok) {
      console.error("Upload failed:", await upload.text());
      throw new Error("Failed to upload to feedback bucket.");
    }

    const insert = await fetch(`${supabaseUrl}/rest/v1/ai_resume_feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        file_name,
        file_size,
        ai_feedback: feedback,
        bucket_name: "feedback",
        file_path: filePath,
      }),
    });

    if (!insert.ok) {
      console.error("Insert failed:", await insert.text());
      throw new Error("Failed to insert feedback record.");
    }

    // 7. Return success
    return new Response(JSON.stringify({ feedback }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Analyze Resume Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});