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
  name: string | null;
  email: string | null;
  password: string | null; // DEMO FIELD — NOT USED FOR LOGIN. DO NOT STORE REAL PASSWORDS.
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: string;
  quizzes_taken: number;
  completion_rate: number;
  average_score: number;
  last_quiz_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserWithStats extends User {
  stats: UserStats[];
}