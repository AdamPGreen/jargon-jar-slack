# Jargon Jar

A Slack-first application that helps teams track corporate jargon usage, similar to a swear jar.

## Features

- Track corporate jargon usage in Slack workspaces
- Charge users (fictional currency) for using jargon
- View statistics and leaderboards
- Manage custom jargon words and prices

## Tech Stack

- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Integration**: Slack Bolt API
- **Deployment**: Railway

## Development

### Prerequisites

- Node.js >= 18
- PostgreSQL
- Slack Workspace (for testing)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jargon-jar.git
   cd jargon-jar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Slack App:
   - Create a new Slack App at https://api.slack.com/apps
   - Under "Socket Mode", enable Socket Mode
   - Under "OAuth & Permissions":
     - Add bot token scopes: `commands`, `chat:write`
   - Install the app to your workspace
   - Create an App-Level Token with `connections:write` scope
   - Note down your tokens:
     - Bot Token (starts with `xoxb-`)
     - App Token (starts with `xapp-`)
     - Signing Secret (from Basic Information)

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and Slack tokens
   ```

5. Set up the database:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Slack Commands

Currently implemented:
- `/jargon help` - Show help message
- `/jargon charge @user <word>` - Charge someone for using jargon (coming soon)
- `/jargon add <word> <price>` - Add a new jargon word (coming soon)
- `/jargon list` - Show all tracked words (coming soon)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run prisma:studio` - Open Prisma Studio

## Deployment

This project is configured for deployment on Railway. The deployment process is automated through GitHub Actions.

1. Push to the `main` branch to trigger a production deployment
2. Push to the `development` branch for staging deployment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 