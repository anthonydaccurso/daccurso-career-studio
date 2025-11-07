import { createClient } from '@supabase/supabase-js';

// --- Load environment variables ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// --- Validate ---
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// --- Create and export the client ---
export const supabase = createClient(supabaseUrl, supabaseAnonKey);