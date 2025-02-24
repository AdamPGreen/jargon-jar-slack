import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { DatabaseService } from '../services/db';
import { SlackService } from '../services/slack';
import { config } from '../config';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    workspaceId?: string;
  }
}

const router = Router();
const db = new DatabaseService();
const slack = new SlackService(config.slack, db);

// Middleware to check if user is authenticated
const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session.userId || !req.session.workspaceId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
};

// Initiate Slack OAuth
router.get('/slack/login', (_req: Request, res: Response): void => {
  const scopes = ['identity.basic', 'identity.email', 'identity.team'];
  const url = `https://slack.com/oauth/v2/authorize?client_id=${config.slack.clientId}&scope=${scopes.join(',')}&redirect_uri=${config.slack.redirectUri}`;
  res.redirect(url);
});

// Handle Slack OAuth callback
router.get('/slack/callback', async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.query;
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid code');
    }

    const oauthResponse = await slack.exchangeCodeForToken(code);
    if (!oauthResponse.ok) {
      throw new Error(oauthResponse.error || 'OAuth failed');
    }

    const slackUser = await slack.getUserInfo(oauthResponse.authed_user.id);
    
    // Get or create workspace
    const workspace = await db.getOrCreateWorkspace(
      oauthResponse.team.id,
      oauthResponse.team.name
    );

    // Get or create user
    const user = await db.getOrCreateUser(
      workspace.id,
      oauthResponse.authed_user.id,
      slackUser.real_name || slackUser.name || 'Unknown'
    );

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // 24 hours from now
    
    await db.createSession({
      userId: user.id,
      workspaceId: workspace.id,
      expiresAt
    });

    // Set session data
    req.session.userId = user.id;
    req.session.workspaceId = workspace.id;

    res.redirect(config.frontend.url);
  } catch (error) {
    console.error('OAuth error:', error);
    res.redirect(`${config.frontend.url}/error?message=Authentication failed`);
  }
});

// Logout
router.post('/logout', requireAuth, (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
      res.status(500).json({ error: 'Failed to logout' });
      return;
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/me', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.session.userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const user = await db.getUser(req.session.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
});

export default router; 