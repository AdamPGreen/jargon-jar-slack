import { WebClient } from '@slack/web-api';
import type { DatabaseService } from './db';

interface SlackConfig {
  appToken: string;
  botToken: string;
  signingSecret: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface SlackOAuthResponse {
  ok: boolean;
  access_token: string;
  team: {
    id: string;
    name: string;
  };
  authed_user: {
    id: string;
    access_token: string;
  };
  error?: string;
}

export class SlackService {
  private client: WebClient;
  private config: SlackConfig;
  private db: DatabaseService;

  constructor(config: SlackConfig, db: DatabaseService) {
    this.config = config;
    this.client = new WebClient(config.botToken);
    this.db = db;
  }

  async exchangeCodeForToken(code: string): Promise<SlackOAuthResponse> {
    const response = await this.client.oauth.v2.access({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      redirect_uri: this.config.redirectUri
    });

    return response as SlackOAuthResponse;
  }

  async getUserInfo(userId: string) {
    const response = await this.client.users.info({
      user: userId
    });

    if (!response.ok || !response.user) {
      throw new Error('Failed to fetch user info');
    }

    return response.user;
  }
} 