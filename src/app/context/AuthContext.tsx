import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import { AuthSession } from '../types';

interface AuthContextType {
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
  getCurrentUser: () => AuthSession | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    // Load session on mount
    const currentSession = authService.getCurrentSession();
    setSession(currentSession);
  }, []);

  const login = (newSession: AuthSession) => {
    setSession(newSession);
  };

  const logout = () => {
    authService.logout();
    setSession(null);
  };

  const getCurrentUser = () => {
    return session;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: session !== null,
        login,
        logout,
        getCurrentUser
      }}
    >
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
