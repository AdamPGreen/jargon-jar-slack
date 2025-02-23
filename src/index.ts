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

  // Split only on the first space to get the subcommand
  const [subcommand, ...restArgs] = command.text.split(/\s+(.+)/);

  switch (subcommand.toLowerCase()) {
    case 'help':
    case '': {
      await respond({
        text: 'Jargon Jar - Track corporate speak! 🏺\n\n' +
              '*Available Commands:*\n' +
              '• `/jargon help` - Show this help message\n' +
              '• `/jargon charge @user <word>` - Charge someone for using jargon\n' +
              '• `/jargon add <word or phrase> <price>` - Add a new jargon word\n' +
              '• `/jargon list` - Show all tracked words'
      });
      break;
    }

    case 'add': {
      if (!restArgs.length) {
        await respond({
          text: 'Invalid format. Use: `/jargon add <word or phrase> <price>`\nExample: `/jargon add double click 1.00` or `/jargon add synergy 1.00`'
        });
        return;
      }

      // Get the remaining text and split from the right to get the price
      const fullText = restArgs[0];
      const lastSpaceIndex = fullText.lastIndexOf(' ');
      
      if (lastSpaceIndex === -1) {
        await respond({
          text: 'Invalid format. Use: `/jargon add <word or phrase> <price>`\nExample: `/jargon add double click 1.00` or `/jargon add synergy 1.00`'
        });
        return;
      }

      const word = fullText.substring(0, lastSpaceIndex).toLowerCase();
      const price = Number.parseFloat(fullText.substring(lastSpaceIndex + 1));

      // Validate the word
      if (word.length === 0) {
        await respond({
          text: 'Please provide a word or phrase to add.'
        });
        return;
      }

      // Validate the price
      if (Number.isNaN(price) || price <= 0) {
        await respond({
          text: 'Invalid price. Please provide a positive number.\nExample: `/jargon add double click 1.00`'
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

    case 'list': {
      try {
        // Get workspace
        const workspace = await db.getOrCreateWorkspace(
          command.team_id,
          command.team_domain
        );

        // Get all words
        const words = await db.listWords(workspace.id);

        if (words.length === 0) {
          await respond({
            text: 'No jargon words tracked yet! Add some with `/jargon add <word or phrase> <price>`'
          });
          return;
        }

        // Format the word list
        const wordList = words
          .map(w => `• *${w.word}* - $${w.price.toFixed(2)}${w.useCount > 0 ? ` (used ${w.useCount} times)` : ''}`)
          .join('\n');

        await respond({
          text: `*Tracked Jargon Words:*\n${wordList}`
        });
      } catch (error) {
        console.error('Error listing words:', error);
        await respond({
          text: 'Sorry, something went wrong while fetching the word list. Please try again.'
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