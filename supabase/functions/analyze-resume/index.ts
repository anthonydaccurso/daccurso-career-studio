import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import mammoth from "npm:mammoth";
import pdfParse from "npm:pdf-parse";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://daccursocareerstudio.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, apikey, Content-Type, X-Client-Info",
  "Access-Control-Max-Age": "86400",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    // Expect multipart/form-data
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "Missing file upload." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fileName = file.name;
    const fileSize = file.size;
    const arrayBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(arrayBuffer);

    // Extract text from file
    let resumeText = "";
    if (fileName.toLowerCase().endsWith(".pdf")) {
      const parsed = await pdfParse(fileBytes);
      resumeText = parsed.text;
    } else if (fileName.toLowerCase().endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer: fileBytes });
      resumeText = result.value;
    } else {
      return new Response(JSON.stringify({ error: "Only DOCX or PDF supported." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(JSON.stringify({ error: "File unreadable or too short." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send text to OpenAI
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!openaiKey || !supabaseUrl || !supabaseKey) {
      throw new Error("Missing environment variables.");
    }

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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
              "You are an expert resume reviewer. Provide detailed, structured feedback in plain text (no markdown).",
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

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("OpenAI API error:", errText);
      throw new Error("Failed to analyze resume.");
    }

    const data = await aiResponse.json();
    const feedback = data?.choices?.[0]?.message?.content || "No feedback generated.";

    // Upload file to feedback bucket
    const filePath = `feedback/${fileName}`;
    const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/feedback/${filePath}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
        "Content-Type": "application/octet-stream",
      },
      body: fileBytes,
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      console.error("Upload error:", err);
      throw new Error("Failed to upload file to feedback bucket.");
    }

    // Insert record into ai_resume_feedback
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/ai_resume_feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        file_name: fileName,
        file_size: fileSize,
        ai_feedback: feedback,
        bucket_name: "feedback",
        file_path: filePath,
      }),
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error("Database insert error:", errText);
      throw new Error("Failed to log feedback in database.");
    }

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