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

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. Set up the database:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

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