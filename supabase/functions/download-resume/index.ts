import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

// ✅ Use your live site domain for production
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://daccursocareerstudio.com", // or "*" for local testing
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, apikey",
};

Deno.serve(async (req: Request) => {
  // 🟩 Handle preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const submissionId = url.searchParams.get("id");
    const tableType = url.searchParams.get("type") || "manual";

    if (!submissionId) {
      return new Response(
        JSON.stringify({ error: "Missing submission ID." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 🧠 Initialize Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 🗄️ Determine which table to read from
    const tableName =
      tableType === "ai" ? "ai_resume_feedback" : "resume_submissions";

    // 🧾 Fetch file data from DB
    const { data, error } = await supabase
      .from(tableName)
      .select("file_name, file_data")
      .eq("id", submissionId)
      .maybeSingle();

    if (error) {
      console.error("Supabase error:", error);
      return new Response(
        JSON.stringify({ error: "Error fetching submission." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!data) {
      return new Response(
        JSON.stringify({ error: "Submission not found." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!data.file_data) {
      return new Response(
        JSON.stringify({ error: "No file data available." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 🧩 Decode Base64 to binary
    const binaryString = atob(data.file_data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // 🧾 Determine content type
    const contentType = data.file_name.endsWith(".pdf")
      ? "application/pdf"
      : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    // ✅ Return the binary file
    return new Response(bytes, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${data.file_name}"`,
      },
    });
  } catch (error) {
    console.error("Error in download-resume:", error);
    return new Response(
      JSON.stringify({
        error:
          "An error occurred: " +
          (error instanceof Error ? error.message : "Unknown error"),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});