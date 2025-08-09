import { supabase } from '../lib/supabase';
import type { UserWithStats } from '../lib/supabase';

/**
 * Sanitize user input to prevent potential security issues
 */
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML/script tags
    .substring(0, 255); // Limit length to prevent buffer overflow
};

/**
 * Validate and sanitize email input
 */
const sanitizeEmail = (email: string): string => {
  return email
    .toLowerCase()
    .trim()
    .replace(/[<>'"]/g, '') // Remove quotes and HTML chars
    .substring(0, 254); // RFC 5321 email length limit
};

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
 * Register a new user using Supabase Auth
 * Creates auth user + profile row with RLS protection
 */
export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    // Sanitize all inputs
    const sanitizedName = sanitizeInput(userData.name);
    const sanitizedEmail = sanitizeEmail(userData.email);

    // Additional validation
    if (!sanitizedName || sanitizedName.length < 2) {
      return {
        success: false,
        message: 'Tên phải có ít nhất 2 ký tự và chứa các ký tự hợp lệ.'
      };
    }

    if (!isValidEmail(sanitizedEmail)) {
      return {
        success: false,
        message: 'Vui lòng cung cấp địa chỉ email hợp lệ.'
      };
    }

    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      return {
        success: false,
        message: passwordValidation.message
      };
    }

    // 1. Create auth user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password: userData.password,
      options: {
        data: {
          name: sanitizedName
        }
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        return {
          success: false,
          message: 'Tài khoản với email này đã tồn tại. Vui lòng thử đăng nhập.'
        };
      }
      if (authError.message.includes('User already registered')) {
        return {
          success: false,
          message: 'Tài khoản với email này đã tồn tại. Vui lòng thử đăng nhập.'
        };
      }
      throw authError;
    }

    if (!authData.user) {
      return {
        success: false,
        message: 'Không thể tạo tài khoản. Vui lòng thử lại.'
      };
    }

    // 2. Create profile row (RLS will ensure user can only create their own)
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          name: sanitizedName,
          email: sanitizedEmail,
          password: 'DEMO_ONLY_NOT_USED' // DEMO FIELD - NOT USED FOR AUTH
        }
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // The user is still created in auth, just without extended profile
    }

    // 3. Initialize user stats
    const { error: statsError } = await supabase
      .from('user_stats')
      .insert([
        {
          user_id: authData.user.id,
          quizzes_taken: 0,
          completion_rate: 0,
          average_score: 0,
          last_quiz_date: null
        }
      ]);

    if (statsError) {
      console.error('Stats creation error:', statsError);
      // Don't fail registration if stats creation fails
    }

    // 4. Get user with stats
    const userWithStats = await getUserWithStats();

    return {
      success: true,
      message: 'Tạo tài khoản thành công! Chào mừng đến với IELTS Sigma Boy!',
      user: userWithStats
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Không thể tạo tài khoản. Vui lòng thử lại.'
    };
  }
};

/**
 * Login user using Supabase Auth
 */
export const loginUser = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    // Sanitize inputs
    const sanitizedEmail = sanitizeEmail(loginData.email);

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password: loginData.password,
    });

    if (authError) {
      return {
        success: false,
        message: authError.message.includes('Invalid login credentials') 
          ? 'Email hoặc mật khẩu không đúng. Vui lòng kiểm tra và thử lại.'
          : 'Đăng nhập thất bại. Vui lòng thử lại.'
      };
    }

    if (!authData.user) {
      return {
        success: false,
        message: 'Đăng nhập thất bại. Vui lòng thử lại.'
      };
    }

    // Return basic user info - AuthContext will handle the session
    const userProfile = {
      id: authData.user.id,
      name: authData.user.user_metadata?.name || authData.user.email?.split('@')[0] || 'User',
      email: authData.user.email || sanitizedEmail,
      created_at: authData.user.created_at || new Date().toISOString(),
      updated_at: authData.user.updated_at || new Date().toISOString(),
      stats: null
    };

    return {
      success: true,
      message: `Đăng nhập thành công! Chào mừng trở lại, ${userProfile.name}!`,
      user: userProfile
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Đăng nhập thất bại. Vui lòng thử lại.'
    };
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  await supabase.auth.signOut();
};

/**
 * Get current user with stats (RLS-protected)
 */
export const getUserWithStats = async (): Promise<UserWithStats | null> => {
  try {
    // Get current auth user
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (!authUser) {
      return null;
    }

    // Get profile (RLS ensures only own profile)
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, name, email, created_at, updated_at')
      .single();

    if (profileError) {
      // Handle case where user profile doesn't exist yet
      if (profileError.code === 'PGRST116') {
        return null;
      }
      throw profileError;
    }

    // Get stats (RLS ensures only own stats)
    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('*')
      .single();

    if (statsError && statsError.code !== 'PGRST116') {
      throw statsError;
    }

    return {
      ...profile,
      stats: stats || null
    };
  } catch (error) {
    console.error('Error getting user with stats:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
  }
  if (password.length > 128) {
    return { isValid: false, message: 'Mật khẩu phải ít hơn 128 ký tự' };
  }
  return { isValid: true, message: '' };
};