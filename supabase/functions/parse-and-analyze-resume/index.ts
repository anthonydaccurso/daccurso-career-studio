import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://daccursocareerstudio.com", // or "*" for local dev
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const fileType = file.type;
    const arrayBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(arrayBuffer);
    let resumeText = "";

    if (fileType === "application/pdf") {
      const pdfParse = await import("npm:pdf-parse@1.1.1");
      const pdfData = await pdfParse.default(fileBytes);
      resumeText = pdfData.text;
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    ) {
      const mammoth = await import("npm:mammoth@1.8.0");
      const result = await mammoth.extractRawText({ buffer: fileBytes });
      resumeText = result.value;
    } else {
      return new Response(
        JSON.stringify({
          error: "Unsupported file type. Please upload PDF or DOCX.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(
        JSON.stringify({
          error: "Unable to extract text from file or file is too short.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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
              "You are an expert hiring manager and resume reviewer. Provide detailed, plain-text feedback (no markdown) on resume quality, formatting, ATS optimization, and actionable improvements.",
          },
          {
            role: "user",
            content: `Analyze this resume and provide plain-text feedback under these categories:\n
1. Overall Impression (score out of 10)
2. Formatting & Layout
3. Content Quality
4. ATS Optimization
5. Key Strengths
6. Areas for Improvement
7. Specific Recommendations

Resume:\n${resumeText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("OpenAI API Error:", errText);
      return new Response(
        JSON.stringify({ error: "Failed to analyze resume." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiData = await aiResponse.json();
    const feedback = aiData.choices?.[0]?.message?.content || "No feedback generated.";

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const binaryString = Array.from(new Uint8Array(arrayBuffer))
      .map((b) => String.fromCharCode(b))
      .join("");
    const fileData = btoa(binaryString);

    const { error: dbError } = await supabase
      .from("ai_resume_feedback")
      .insert({
        file_name: file.name,
        file_data: fileData,
        file_size: file.size,
        ai_feedback: feedback,
        status: "completed",
      });

    if (dbError) console.error("Database insert error:", dbError);

    return new Response(
      JSON.stringify({ feedback }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in parse-and-analyze-resume:", error);
    return new Response(
      JSON.stringify({
        error:
          "An error occurred processing your request: " +
          (error instanceof Error ? error.message : "Unknown error"),
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});