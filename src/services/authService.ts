import { supabase } from '../lib/supabase';
import type { User, UserWithStats } from '../lib/supabase';

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
 * Register a new user
 * NOTE: In production, passwords MUST be hashed using bcrypt or similar!
 * This plain text storage is for demo purposes only and is NOT secure!
 */
export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    // Sanitize all inputs
    const sanitizedName = sanitizeInput(userData.name);
    const sanitizedEmail = sanitizeEmail(userData.email);
    const sanitizedPassword = userData.password.substring(0, 128); // Limit password length

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

    // Check if user already exists
    // Using Supabase's parameterized queries - SAFE from SQL injection
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', sanitizedEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingUser) {
      return {
        success: false,
        message: 'Tài khoản với email này đã tồn tại. Vui lòng thử đăng nhập.'
      };
    }

    // Create new user
    // WARNING: Password is stored as plain text for demo purposes only!
    // In production, use: const hashedPassword = await bcrypt.hash(userData.password, 12);
    // Using Supabase's parameterized insert - SAFE from SQL injection
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          name: sanitizedName,
          email: sanitizedEmail,
          password: sanitizedPassword // SECURITY WARNING: Plain text password!
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
 * Login user
 * NOTE: In production, use bcrypt.compare(password, hashedPassword) for password verification!
 */
export const loginUser = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    // Sanitize inputs
    const sanitizedEmail = sanitizeEmail(loginData.email);
    const sanitizedPassword = loginData.password.substring(0, 128);

    // Find user by email
    // Using Supabase's parameterized queries - SAFE from SQL injection
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', sanitizedEmail)
      .single();

    if (userError || !user) {
      return {
        success: false,
        message: 'Email hoặc mật khẩu không đúng. Vui lòng kiểm tra và thử lại.'
      };
    }

    // Verify password
    // WARNING: Plain text comparison for demo purposes only!
    // In production, use: const isValidPassword = await bcrypt.compare(loginData.password, user.password);
    if (user.password !== sanitizedPassword) {
      return {
        success: false,
        message: 'Email hoặc mật khẩu không đúng. Vui lòng kiểm tra và thử lại.'
      };
    }

    // Get user with stats
    const userWithStats = await getUserWithStats(user.id);

    return {
      success: true,
      message: `Chào mừng trở lại, ${user.name}!`,
      user: userWithStats
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
 * Enhanced regex for better email validation
 */
export const isValidEmail = (email: string): boolean => {
  // More comprehensive email validation regex
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