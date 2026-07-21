import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const isValidUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://");

const supabaseUrl = isValidUrl ? rawUrl : "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";

/**
 * Public client for client-side queries (read-only where RLS allows)
 */
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Service role client for secure server-side database operations (Order creation, Payment verification)
 * WARNING: Never import or use this client on the client-side!
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
