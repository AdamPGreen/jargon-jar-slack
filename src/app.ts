import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { DatabaseService } from './services/db';
import { SlackService } from './services/slack';
import { config } from './config';
import authRoutes from './routes/auth';

const app = express();
const db = new DatabaseService();
const slack = new SlackService(config.slack, db);

app.use(express.json());
app.use(cookieParser());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use('/auth', authRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app; 