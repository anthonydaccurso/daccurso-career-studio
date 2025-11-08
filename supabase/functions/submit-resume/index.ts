import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://daccursocareerstudio.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, apikey'
};

Deno.serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: corsHeaders
    });
  }
  try {
    // Log EST timestamp
    const estTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    console.log('[EST]', estTime, '- Manual resume submission received');

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { name, email, phone, file_name, file_url, file_data, file_size, comments } = await req.json();
    if (!file_name || !file_url) {
      return new Response(JSON.stringify({
        success: false,
        error: 'File details missing.'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }
    const { data, error } = await supabase.from('resume_submissions').insert([
      {
        service_type: 'manual',
        name: name || null,
        email: email || null,
        phone: phone || '',
        file_name: file_name || '',
        file_url: file_url || '',
        file_size: file_size || null,
        comments: comments || '',
        status: 'pending'
      }
    ]).select().single();
    if (error) throw error;
    
    console.log('[EST]', new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }), '- Manual resume saved:', file_name);

    return new Response(JSON.stringify({
      success: true,
      data
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in submit-resume:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});