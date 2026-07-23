
import { createClient } from '@supabase/supabase-js';

// Access environment variables via import.meta.env for Vite or process.env fallbacks
const rawUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  (typeof process !== 'undefined' && process.env ? (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL) : undefined) ||
  'https://blkxqartwbmjmkvyelzq.supabase.co';

const rawKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  (typeof process !== 'undefined' && process.env ? (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY) : undefined) ||
  'sb_publishable_CGsJxiNsTXFFdCfsR9kl-g_NlqrRLTz';

// Validation helper to ensure the URL is valid before initialization
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const supabaseUrl = isValidUrl(rawUrl) ? rawUrl : 'https://blkxqartwbmjmkvyelzq.supabase.co';
export const supabaseKey = rawKey || 'sb_publishable_CGsJxiNsTXFFdCfsR9kl-g_NlqrRLTz';

// Only initialize if keys are present and URL is valid
export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseKey && 
  isValidUrl(supabaseUrl) &&
  !supabaseUrl.includes('your-project')
);

if (!isSupabaseConfigured) {
  console.warn("Supabase is not configured or URL is invalid. Check your .env file and ensure variables are prefixed with VITE_.");
}

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

