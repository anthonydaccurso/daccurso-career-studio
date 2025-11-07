import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://daccursocareerstudio.com",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const { resumeText } = await req.json();

    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(
        JSON.stringify({
          error: "Resume text is required and must contain enough content.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("Missing OpenAI API key in environment.");
    }

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert hiring manager and resume reviewer. Analyze resumes and provide detailed, actionable feedback on formatting, content, ATS optimization, and overall presentation. Be specific, helpful, and professional. Avoid markdown syntax — use plain text paragraphs.",
        },
        {
          role: "user",
          content: `Please analyze this resume and provide detailed feedback in the following categories:
          
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
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout safeguard

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", errText);
      return new Response(
        JSON.stringify({
          error: "Failed to analyze resume. Please try again later.",
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const data = await response.json();
    const feedback =
      data?.choices?.[0]?.message?.content || "No feedback generated.";

    return new Response(JSON.stringify({ feedback }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-resume error:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? `Error: ${error.message}`
            : "Unknown internal error.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});