import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import mammoth from "npm:mammoth@1.8.0";
import pdfParse from "npm:pdf-parse@1.1.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://daccursocareerstudio.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, apikey, Content-Type, X-Client-Info",
  "Access-Control-Max-Age": "86400",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fileName = file.name;
    const fileSize = file.size;
    const arrayBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(arrayBuffer);

    // Extract text based on file type
    let resumeText = "";
    const lowerName = fileName.toLowerCase();

    if (lowerName.endsWith(".pdf")) {
      const parsed = await pdfParse(fileBytes);
      resumeText = parsed.text;
    } else if (lowerName.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer: fileBytes });
      resumeText = result.value;
    } else {
      return new Response(
        JSON.stringify({ error: "Only PDF or DOCX files are supported." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate extracted text
    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: "File is unreadable or too short." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get environment variables
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!openaiKey || !supabaseUrl || !supabaseKey) {
      throw new Error("Missing required environment variables");
    }

    // Call OpenAI API
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
              "You are an expert resume reviewer and hiring manager. Provide detailed, structured feedback in plain text (no markdown formatting).",
          },
          {
            role: "user",
            content: `Analyze this resume and provide feedback under these categories:

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
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("OpenAI API error:", errText);
      throw new Error("Failed to analyze resume with AI");
    }

    const aiData = await aiResponse.json();
    const feedback = aiData?.choices?.[0]?.message?.content || "No feedback generated.";

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate unique file path with timestamp
    const timestamp = new Date().getTime();
    const fileExtension = lowerName.endsWith(".pdf") ? "pdf" : "docx";
    const uniqueFileName = `${timestamp}_${fileName}`;
    const filePath = `feedback/${uniqueFileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("feedback")
      .upload(filePath, fileBytes, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(`Failed to upload file: ${uploadError.message}`);
    }

    // Insert record into database
    const { error: dbError } = await supabase
      .from("ai_resume_feedback")
      .insert({
        file_name: fileName,
        file_size: fileSize,
        ai_feedback: feedback,
        bucket_name: "feedback",
        file_path: filePath,
        status: "completed",
      });

    if (dbError) {
      console.error("Database insert error:", dbError);
      throw new Error(`Failed to save feedback: ${dbError.message}`);
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        feedback,
        filePath,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Analyze Resume Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});