import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  const { data, error } = await supabase.auth.admin.updateUserById(
    "850e7413-5694-4132-819e-c0d1ab40c7aa",
    { password: "Ad870415!!" }
  );

  if (error) {
    console.error("Error resetting password:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  return new Response(JSON.stringify({ success: true, data }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});