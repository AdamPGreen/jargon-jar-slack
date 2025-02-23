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

// Parse Slack user ID from mention
function parseUserId(mention: string, commandUserId: string): string | null {
  console.log('Raw mention:', mention);
  
  // If it's a direct @mention format from Slack
  const directMatch = mention.match(/^<@([UW][A-Z0-9]+)>$/);
  if (directMatch) return directMatch[1];

  // If it's a plain @ mention and matches the command user
  const plainMention = mention.replace(/^@/, '');
  console.log('Plain mention:', plainMention, 'Command user:', commandUserId);
  
  // For now, if someone mentions themselves, we'll use their ID
  // Later we can add user lookup by username
  if (plainMention === 'adam.p.green') {
    return commandUserId;
  }

  return null;
}

// Handle /jargon command
app.command('/jargon', async ({ command, ack, respond }) => {
  // Acknowledge command received
  await ack();

  try {
    // Get or create workspace and user for every command
    const workspace = await db.getOrCreateWorkspace(
      command.team_id,
      command.team_domain
    );

    const user = await db.getOrCreateUser(
      workspace.id,
      command.user_id,
      command.user_name
    );

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
                '• `/jargon list` - Show all tracked words\n' +
                '• `/jargon stats` - View your jargon statistics\n' +
                '• `/jargon seed` - Add default jargon words to workspace\n' +
                '• `/jargon leaderboard` - View workspace statistics and rankings'
        });
        break;
      }

      case 'charge': {
        if (!restArgs.length) {
          await respond({
            text: 'Invalid format. Use: `/jargon charge @user <word>`\nExample: `/jargon charge @john synergy`'
          });
          return;
        }

        console.log('Full command:', command);
        console.log('Rest args:', restArgs);
        
        const parts = restArgs[0].trim().split(/\s+/);
        console.log('Parts:', parts);
        
        // Need at least @user and word
        if (parts.length < 2) {
          await respond({
            text: 'Invalid format. Use: `/jargon charge @user <word>`\nExample: `/jargon charge @john synergy`'
          });
          return;
        }

        // Parse user mention
        console.log('Attempting to parse user from:', parts[0]);
        const targetUserId = parseUserId(parts[0], command.user_id);
        console.log('Parsed user ID:', targetUserId);
        if (!targetUserId) {
          await respond({
            text: 'Invalid user mention. Make sure to @mention the user.'
          });
          return;
        }

        try {
          // Try to get user info from Slack to verify they're in the channel
          const result = await app.client.users.info({
            user: targetUserId
          });

          if (!result.ok || !result.user) {
            await respond({
              text: 'Unable to verify user. They might not be in this workspace.'
            });
            return;
          }

          // Get the word (could be multiple words)
          const word = parts.slice(1).join(' ').toLowerCase();

          // Get or create the target user
          const targetUser = await db.getOrCreateUser(
            workspace.id,
            targetUserId,
            result.user.name || targetUserId // Use actual username from Slack
          );

          // Create the charge
          const chargeResult = await db.createCharge(
            workspace.id,
            targetUser.id,
            user.id,
            word
          );

          if (chargeResult.success) {
            const { word: jargonWord } = chargeResult;
            const newTotal = Number(targetUser.totalCharged) + jargonWord.price;
            await respond({
              text: `💰 <@${targetUserId}> has been charged $${jargonWord.price.toFixed(2)} for using "${jargonWord.word}"\n` +
                    `Their total is now $${newTotal.toFixed(2)}`
            });
          } else {
            await respond({
              text: `Error: ${chargeResult.error}`
            });
          }
        } catch (error: unknown) {
          console.error('Error in charge command:', error);
          // Type guard for Slack API errors
          if (typeof error === 'object' && error !== null && 'data' in error && 
              typeof error.data === 'object' && error.data !== null && 
              'error' in error.data && error.data.error === 'user_not_found') {
            await respond({
              text: 'This user is not in the current channel. You can:\n' +
                   '• Invite them to the channel first\n' +
                   '• Use this command in a channel where they are already a member'
            });
          } else {
            await respond({
              text: 'Sorry, something went wrong while processing the charge.'
            });
          }
        }
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
        break;
      }

      case 'list': {
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
        break;
      }

      case 'stats': {
        const stats = await db.getUserStats(command.user_id);
        if (!stats) {
          await respond({
            text: 'No statistics available yet. Start using jargon to see your stats!'
          });
          return;
        }

        const mostUsedSection = stats.mostUsedWords.length > 0
          ? `\n\n*Your Most Used Words:*\n${stats.mostUsedWords
              .map(w => `• *${w.word}* - ${w.count} times ($${w.totalAmount.toFixed(2)})`)
              .join('\n')}`
          : '';

        await respond({
          text: `*Your Jargon Statistics* 📊
Total Charged: $${stats.totalCharged.toFixed(2)}
Times Caught: ${stats.chargeCount}${mostUsedSection}`
        });
        break;
      }

      case 'leaderboard': {
        const stats = await db.getWorkspaceStats(workspace.id);
        
        // Format leaderboard
        const leaderboardText = stats.leaderboard
          .map((user, index) => 
            `${index + 1}. <@${user.slackUserId}> - $${user.totalCharged.toFixed(2)} (${user.chargeCount} charges)`
          )
          .join('\n');

        // Format top words
        const topWordsText = stats.topWords
          .map(word => 
            `• *${word.word}* - ${word.useCount} uses ($${word.totalCollected.toFixed(2)})`
          )
          .join('\n');

        // Format workspace totals
        const totalsText = [
          '*Workspace Totals:*',
          `• Total Collected: $${stats.workspaceTotals.totalCollected.toFixed(2)}`,
          `• Total Charges: ${stats.workspaceTotals.totalCharges}`,
          `• Active Users: ${stats.workspaceTotals.uniqueUsers}`
        ].join('\n');

        await respond({
          text: [
            '*🏆 Jargon Jar Leaderboard*',
            '',
            leaderboardText,
            '',
            '*Most Used Words:*',
            topWordsText,
            '',
            totalsText
          ].join('\n')
        });
        break;
      }

      default: {
        await respond({
          text: 'Command not recognized. Try `/jargon help` to see available commands.'
        });
      }
    }
  } catch (error) {
    console.error('Error processing command:', error);
    await respond({
      text: 'Sorry, something went wrong while processing your command. Please try again.'
    });
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