import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserWithStats } from '../lib/supabase';

interface AuthContextType {
  user: UserWithStats | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserWithStats) => void;
  logout: () => void;
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
    // Load user from localStorage on app start
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('ielts_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('ielts_user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData: UserWithStats) => {
    setUser(userData);
    localStorage.setItem('ielts_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ielts_user');
  };

  const updateUser = (userData: UserWithStats) => {
    setUser(userData);
    localStorage.setItem('ielts_user', JSON.stringify(userData));
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