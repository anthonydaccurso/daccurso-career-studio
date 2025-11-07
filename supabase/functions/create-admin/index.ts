import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://daccursocareerstudio.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, apikey"
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // === Step 1: Check if password has been leaked ===
    let leaked = false;
    let count = 0;
    try {
      const checkResponse = await fetch(`${supabaseUrl}/functions/v1/check-password-leaked`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (checkResponse.ok) {
        const result = await checkResponse.json();
        leaked = result.leaked;
        count = result.count;
      } else {
        console.warn("Password leak check failed or unavailable.");
      }

      await supabase.from("password_validation_log").insert({
        user_email: email,
        validation_passed: !leaked,
        breach_count: count,
        ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip"),
        user_agent: req.headers.get("user-agent")
      });

      if (leaked) {
        return new Response(
          JSON.stringify({
            error: `This password appears in ${count.toLocaleString()} known data breaches. Please choose a stronger password.`
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } catch (checkErr) {
      console.error("Password leak check error:", checkErr);
    }

    // === Step 2: Create the user in Supabase Auth ===
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError || !authData?.user?.id) {
      return new Response(
        JSON.stringify({ error: authError?.message || "Failed to create user account." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = authData.user.id;

    // === Step 3: Add the user to admin_users table ===
    const { error: dbError } = await supabase.from("admin_users").insert({
      id: crypto.randomUUID(), // ensure valid UUID
      email,
      user_id: userId,
      created_at: new Date().toISOString()
    });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return new Response(
        JSON.stringify({
          error: `User created but failed to insert into admin_users: ${dbError.message}`
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // === Step 4: Success response ===
    return new Response(
      JSON.stringify({
        success: true,
        message: "Admin user created successfully.",
        userId
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in create-admin:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred."
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});