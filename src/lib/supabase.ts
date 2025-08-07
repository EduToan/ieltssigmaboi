import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // NOTE: In production, this should be hashed!
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  quizzes_taken: number;
  completion_rate: number;
  average_score: number;
  last_quiz_date: string | null;
}

export interface UserWithStats extends User {
  stats: UserStats;
}