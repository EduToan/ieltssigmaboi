import { supabase } from '../lib/supabase';
import type { UserWithStats } from '../lib/supabase';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: UserWithStats;
}

/**
 * Register a new user using Supabase Auth.
 * The password field in public.users is left null and is NOT used for authentication.
 */
export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });
    if (error || !data.user) {
      throw error || new Error('Sign up failed');
    }

    await supabase.from('users').insert({
      id: data.user.id,
      name: userData.name,
      email: userData.email,
    });

    const user = await getUserWithStats();
    return { success: true, message: 'Account created successfully!', user: user! };
  } catch (err) {
    console.error('Registration error:', err);
    return { success: false, message: 'Failed to create account. Please try again.' };
  }
};

/**
 * Sign in an existing user using Supabase Auth.
 */
export const loginUser = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    if (error || !data.user) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }

    const user = await getUserWithStats();
    if (!user) {
      return { success: false, message: 'User profile not found.' };
    }
    return { success: true, message: `Welcome back, ${user.name || ''}!`, user };
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, message: 'Login failed. Please try again.' };
  }
};

/**
 * Fetch the signed-in user's profile and up to 20 stats rows.
 */
export const getUserWithStats = async (): Promise<UserWithStats | null> => {
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('id,name,email,password,created_at,updated_at')
    .single();
  if (profileError || !profile) {
    return null;
  }

  const { data: stats, error: statsError } = await supabase
    .from('user_stats')
    .select('id,quizzes_taken,completion_rate,average_score,last_quiz_date,created_at,updated_at')
    .order('created_at', { ascending: false })
    .limit(20);
  if (statsError) {
    return { ...profile, stats: [] };
  }
  return { ...profile, stats: stats || [] };
};

/**
 * List the current user's stats with safe sorting.
 */
export const listUserStats = async (
  userSort: string,
  userDir: 'asc' | 'desc'
) => {
  const allowedSort = ['created_at', 'average_score'];
  const sort = allowedSort.includes(userSort) ? userSort : 'created_at';
  const ascending = userDir === 'asc';

  const q = supabase
    .from('user_stats')
    .select('id,quizzes_taken,completion_rate,average_score,last_quiz_date,created_at')
    .order(sort, { ascending })
    .limit(20);

  return await q;
};

/**
 * Insert a new stats row for the current user.
 */
export const insertUserStat = async (stat: {
  quizzes_taken: number;
  completion_rate: number;
  average_score: number;
  last_quiz_date: string | null;
}) => {
  const { data: authData } = await supabase.auth.getUser();
  return await supabase.from('user_stats').insert({
    user_id: authData.user?.id,
    quizzes_taken: stat.quizzes_taken,
    completion_rate: stat.completion_rate,
    average_score: stat.average_score,
    last_quiz_date: stat.last_quiz_date,
  });
};

/**
 * Update an existing stats row belonging to the current user.
 */
export const updateUserStat = async (
  statId: string,
  stat: {
    quizzes_taken: number;
    completion_rate: number;
    average_score: number;
    last_quiz_date: string | null;
  }
) => {
  return await supabase
    .from('user_stats')
    .update({
      quizzes_taken: stat.quizzes_taken,
      completion_rate: stat.completion_rate,
      average_score: stat.average_score,
      last_quiz_date: stat.last_quiz_date,
    })
    .eq('id', statId);
};

/**
 * Validate email format.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength.
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  message: string;
} => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  if (password.length > 128) {
    return { isValid: false, message: 'Password must be less than 128 characters' };
  }
  return { isValid: true, message: '' };
};
