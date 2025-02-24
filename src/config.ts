interface SlackConfig {
  appToken: string;
  botToken: string;
  signingSecret: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  slack: {
    appToken: requireEnv('SLACK_APP_TOKEN'),
    botToken: requireEnv('SLACK_BOT_TOKEN'),
    signingSecret: requireEnv('SLACK_SIGNING_SECRET'),
    clientId: requireEnv('SLACK_CLIENT_ID'),
    clientSecret: requireEnv('SLACK_CLIENT_SECRET'),
    redirectUri: requireEnv('SLACK_REDIRECT_URI')
  } as SlackConfig,
  frontend: {
    url: requireEnv('FRONTEND_URL')
  }
}; 