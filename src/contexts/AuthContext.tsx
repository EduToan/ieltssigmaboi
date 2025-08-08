import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { getUserWithStats, logoutUser } from '../services/authService';
import type { UserWithStats } from '../lib/supabase';

interface AuthContextType {
  user: UserWithStats | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserWithStats) => void;
  logout: () => Promise<void>;
  updateUser: (user: UserWithStats) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserWithStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const userWithStats = await getUserWithStats();
          setUser(userWithStats);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Load user profile asynchronously after sign-in
          try {
            const userWithStats = await getUserWithStats();
            setUser(userWithStats);
          } catch (error) {
            console.error('Error loading user profile:', error);
            // Fallback to basic user info from auth
            const basicUser = {
              id: session.user.id,
              name: session.user.user_metadata?.name || 'User',
              email: session.user.email || '',
              created_at: session.user.created_at || new Date().toISOString(),
              updated_at: session.user.updated_at || new Date().toISOString(),
              stats: null
            };
            setUser(basicUser);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = (userData: UserWithStats) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData: UserWithStats) => {
    setUser(userData);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};