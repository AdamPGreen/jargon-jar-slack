import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, AuthState, User } from '../types/auth';
import { authApi, AuthError } from '../api/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await authApi.getCurrentUser();
      setState({
        isAuthenticated: true,
        isLoading: false,
        user,
        error: null,
      });
    } catch (error) {
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null, // Don't show error on initial load
      });
    }
  };

  const login = () => {
    const clientId = import.meta.env.VITE_SLACK_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SLACK_REDIRECT_URI;
    const scope = 'identity.basic,identity.email,identity.avatar,team:read';
    
    window.location.href = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof AuthError ? error.message : 'Failed to logout',
      }));
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
} 