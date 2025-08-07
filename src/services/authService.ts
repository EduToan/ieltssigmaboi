import { supabase } from '../lib/supabase';
import type { User, UserWithStats } from '../lib/supabase';

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
 * Register a new user
 * NOTE: In production, passwords MUST be hashed using bcrypt or similar!
 * This plain text storage is for demo purposes only and is NOT secure!
 */
export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', userData.email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email already exists. Please try logging in instead.'
      };
    }

    // Create new user
    // WARNING: Password is stored as plain text for demo purposes only!
    // In production, use: const hashedPassword = await bcrypt.hash(userData.password, 12);
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          name: userData.name.trim(),
          email: userData.email.toLowerCase().trim(),
          password: userData.password // SECURITY WARNING: Plain text password!
        }
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    // Initialize user stats
    await supabase
      .from('user_stats')
      .insert([
        {
          user_id: newUser.id,
          quizzes_taken: 0,
          completion_rate: 0,
          average_score: 0,
          last_quiz_date: null
        }
      ]);

    // Get user with stats
    const userWithStats = await getUserWithStats(newUser.id);

    return {
      success: true,
      message: 'Account created successfully! Welcome to IELTS Sigma Boy!',
      user: userWithStats
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Failed to create account. Please try again.'
    };
  }
};

/**
 * Login user
 * NOTE: In production, use bcrypt.compare(password, hashedPassword) for password verification!
 */
export const loginUser = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    // Find user by email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', loginData.email.toLowerCase().trim())
      .single();

    if (userError || !user) {
      return {
        success: false,
        message: 'Invalid email or password. Please check your credentials and try again.'
      };
    }

    // Verify password
    // WARNING: Plain text comparison for demo purposes only!
    // In production, use: const isValidPassword = await bcrypt.compare(loginData.password, user.password);
    if (user.password !== loginData.password) {
      return {
        success: false,
        message: 'Invalid email or password. Please check your credentials and try again.'
      };
    }

    // Get user with stats
    const userWithStats = await getUserWithStats(user.id);

    return {
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: userWithStats
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Login failed. Please try again.'
    };
  }
};

/**
 * Get user with their statistics
 */
const getUserWithStats = async (userId: string): Promise<UserWithStats> => {
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  const { data: stats } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  return {
    ...user,
    stats: stats || {
      quizzes_taken: 0,
      completion_rate: 0,
      average_score: 0,
      last_quiz_date: null
    }
  };
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  if (password.length > 128) {
    return { isValid: false, message: 'Password must be less than 128 characters' };
  }
  return { isValid: true, message: '' };
};