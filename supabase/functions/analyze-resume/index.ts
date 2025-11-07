import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import mammoth from "npm:mammoth";
import pdfParse from "npm:pdf-parse";

// Strict CORS whitelist for your exact frontend domain
const ALLOWED_ORIGINS = [
  "https://daccursocareerstudio.com",
  "https://www.daccursocareerstudio.com",
  "http://localhost:5173", // optional for local dev
  "http://localhost:3000",
];

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : "https://daccursocareerstudio.com";

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Client-Info, apikey",
    "Access-Control-Allow-Private-Network": "true",
    "Access-Control-Max-Age": "86400",
  };

  // Return proper preflight response (required for Supabase)
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

    // --- Decode base64 bytes
    const base64Data = file_data.split(",")[1];
    const fileBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    // --- Extract text
    let resumeText = "";
    if (file_name.toLowerCase().endsWith(".pdf")) {
      const parsed = await pdfParse(fileBytes);
      resumeText = parsed.text;
    } else if (file_name.toLowerCase().endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer: fileBytes });
      resumeText = result.value;
    } else {
      return new Response(
        JSON.stringify({ error: "Only DOCX or PDF are supported." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: "File appears empty or unreadable." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- AI feedback
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!openaiApiKey || !supabaseUrl || !supabaseKey)
      throw new Error("Missing environment variables.");

    const aiRequest = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert resume reviewer. Provide professional, plain-text feedback without markdown formatting.",
          },
          {
            role: "user",
            content: `Analyze this resume and give feedback under:
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

    if (!aiRequest.ok) {
      const errText = await aiRequest.text();
      console.error("OpenAI API error:", errText);
      throw new Error("OpenAI request failed.");
    }

    const data = await aiRequest.json();
    const feedback = data?.choices?.[0]?.message?.content || "No feedback generated.";

    // --- Upload file to feedback/feedback/
    const filePath = `feedback/${file_name}`;
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
      const errText = await uploadRes.text();
      console.error("Upload failed:", errText);
      throw new Error("Failed to upload to feedback bucket.");
    }

    // --- Insert DB record
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/ai_resume_feedback`, {
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

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error("DB insert failed:", errText);
      throw new Error("Failed to insert record into ai_resume_feedback.");
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