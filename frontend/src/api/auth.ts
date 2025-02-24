/// <reference types="vite/client" />
import type { User, SlackOAuthResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authApi = {
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new AuthError('Failed to get current user');
    }

    return response.json();
  },

  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new AuthError('Failed to logout');
    }
  },

  async handleSlackCallback(code: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/slack/callback?code=${code}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new AuthError('Failed to authenticate with Slack');
    }

    const data: SlackOAuthResponse = await response.json();
    
    if (!data.ok) {
      throw new AuthError('Slack authentication failed');
    }

    return this.getCurrentUser();
  },
}; 