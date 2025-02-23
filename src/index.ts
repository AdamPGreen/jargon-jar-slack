import { App } from '@slack/bolt';
import dotenv from 'dotenv';
import { DatabaseService } from './services/db';

// Load environment variables
dotenv.config();

// Initialize services
const db = new DatabaseService();

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

// Handle /jargon command
app.command('/jargon', async ({ command, ack, respond }) => {
  // Acknowledge command received
  await ack();

  const args = command.text.split(' ');
  const subcommand = args[0].toLowerCase();

  switch (subcommand) {
    case 'help':
    case '': {
      await respond({
        text: 'Jargon Jar - Track corporate speak! 🏺\n\n' +
              '*Available Commands:*\n' +
              '• `/jargon help` - Show this help message\n' +
              '• `/jargon charge @user <word>` - Charge someone for using jargon\n' +
              '• `/jargon add <word> <price>` - Add a new jargon word\n' +
              '• `/jargon list` - Show all tracked words'
      });
      break;
    }

    case 'add': {
      // Check if we have both word and price
      if (args.length !== 3) {
        await respond({
          text: 'Invalid format. Use: `/jargon add <word> <price>`\nExample: `/jargon add synergy 1.00`'
        });
        return;
      }

      const word = args[1].toLowerCase();
      const price = Number.parseFloat(args[2]);

      // Validate the price
      if (Number.isNaN(price) || price <= 0) {
        await respond({
          text: 'Invalid price. Please provide a positive number.\nExample: `/jargon add synergy 1.00`'
        });
        return;
      }

      try {
        // Get or create workspace
        const workspace = await db.getOrCreateWorkspace(
          command.team_id,
          command.team_domain
        );

        // Add the word
        const result = await db.addWord(workspace.id, word, price);

        if (result.success) {
          await respond({
            text: `Added "${word}" to the jargon jar! 🏺\nPrice: $${price.toFixed(2)}`
          });
        } else {
          await respond({
            text: `Error: ${result.error}`
          });
        }
      } catch (error) {
        console.error('Error adding word:', error);
        await respond({
          text: 'Sorry, something went wrong while adding the word. Please try again.'
        });
      }
      break;
    }

    default: {
      await respond({
        text: 'Command not recognized. Try `/jargon help` to see available commands.'
      });
    }
  }
});

// Start the app
(async () => {
  try {
    await app.start(process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000);
    console.log('⚡️ Jargon Jar app is running!');
  } catch (error) {
    console.error('Error starting app:', error);
    process.exit(1);
  }
})(); 