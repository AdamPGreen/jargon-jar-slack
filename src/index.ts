import { App } from '@slack/bolt';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Initialize Slack app
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
const startServer = async () => {
  try {
    // Start the Slack app
    await slackApp.start();
    console.log('⚡️ Slack Bolt app is running!');

    // Start Express server
    app.listen(port, () => {
      console.log(`⚡️ Express server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 