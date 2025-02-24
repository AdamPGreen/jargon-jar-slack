export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  workspaceId: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

export interface SlackOAuthResponse {
  ok: boolean;
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    image_192: string;
  };
  team: {
    id: string;
  };
} 