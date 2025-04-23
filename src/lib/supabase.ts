import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client Configuration
 *
 * This file sets up the Supabase client for use throughout the application.
 * It requires environment variables to be set in .env.local file.
 */
// These environment variables need to be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export types for better TypeScript integration
export type {
  SupabaseClient,
  Session,
  User,
  PostgrestError,
} from '@supabase/supabase-js';
