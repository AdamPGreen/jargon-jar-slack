# Jargon Jar - API Specification

## Overview
This document outlines the API endpoints for the Jargon Jar application, including both REST APIs and webhook handlers.

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://api.jargonjar.app`

## Authentication & Security
- Slack OAuth for workspace authentication
- JWT tokens for web dashboard authentication
- API rate limiting: 100 requests per minute per workspace
- All endpoints require authentication unless specified
- CORS enabled for web dashboard domain only

## REST Endpoints

### Workspace Management

```http
# Get workspace details
GET /workspaces/:id
Response: {
  id: string
  name: string
  settings: WorkspaceSettings
  stats: {
    totalCharges: number
    activeUsers: number
    topWords: Array<JargonWordSummary>
  }
}

# Install workspace (Slack OAuth)
POST /workspaces/install
Body: {
  code: string        // Slack OAuth code
  redirectUri: string
}

# Update workspace settings
PATCH /workspaces/:id/settings
Body: {
  settings: Partial<WorkspaceSettings>
}

# Remove workspace
DELETE /workspaces/:id
```

### User Management

```http
# Get user profile
GET /users/:id
Response: {
  id: string
  name: string
  stats: UserStats
  preferences: UserPreferences
}

# Get user statistics
GET /users/:id/stats
Response: {
  totalCharges: number
  streakDays: number
  commonWords: Array<JargonWordUsage>
  achievements: Array<Achievement>
  weeklyTrend: Array<DailyStats>
}

# Get user achievements
GET /users/:id/achievements
Response: Array<{
  id: string
  type: string
  awardedAt: string
  metadata: any
}>

# Update user preferences
PATCH /users/:id/preferences
Body: {
  preferences: Partial<UserPreferences>
}
```

### Jargon Management

```http
# List workspace jargon words
GET /workspaces/:id/words
Query: {
  search?: string
  sort?: 'usage' | 'price' | 'recent'
  page?: number
}
Response: {
  words: Array<JargonWord>
  total: number
}

# Add new jargon word
POST /workspaces/:id/words
Body: {
  word: string
  definition: string
  example?: string
  price: number
  severity?: number
}

# Update jargon word
PATCH /workspaces/:id/words/:wordId
Body: Partial<JargonWord>

# Delete jargon word
DELETE /workspaces/:id/words/:wordId
```

### Charge Management

```http
# Create new charge
POST /workspaces/:id/charges
Body: {
  userId: string
  wordId: string
  context?: string
  channelId?: string
  messageTs?: string
}

# List charges
GET /workspaces/:id/charges
Query: {
  userId?: string
  wordId?: string
  startDate?: string
  endDate?: string
  page?: number
}
Response: {
  charges: Array<Charge>
  total: number
}

# Get charge details
GET /workspaces/:id/charges/:chargeId
Response: Charge
```

### Channel Management

```http
# List monitored channels
GET /workspaces/:id/channels
Response: Array<{
  id: string
  name: string
  isMonitored: boolean
}>

# Update channel monitoring
PATCH /workspaces/:id/channels/:channelId
Body: {
  isMonitored: boolean
}
```

### Analytics & Stats

```http
# Get workspace leaderboard
GET /workspaces/:id/leaderboard
Query: {
  type: 'charges' | 'words' | 'streak'
  timeframe: 'day' | 'week' | 'month' | 'all'
}
Response: Array<LeaderboardEntry>

# Get workspace statistics
GET /workspaces/:id/stats
Query: {
  startDate?: string
  endDate?: string
}
Response: {
  totalCharges: number
  activeUsers: number
  topWords: Array<JargonWordSummary>
  departmentStats: Array<DepartmentSummary>
  timeOfDayStats: Array<HourlyStats>
}
```

## Webhook Handlers

### Slack Events

```http
POST /webhooks/slack/events
Body: SlackEventPayload
```

Handles:
- Message events (for jargon detection)
- Channel events (join/leave)
- Team events (user changes)

### Slack Commands

```http
POST /webhooks/slack/commands
Body: SlackCommandPayload
```

Supported Commands:
- `/jargon charge` - Report jargon usage
- `/jargon stats` - Get quick stats
- `/jargon leaderboard` - Show leaderboard
- `/jargon add` - Add new jargon word

## Type Definitions

```typescript
interface WorkspaceSettings {
  notifications: {
    enabled: boolean
    channels: string[]
    digest: 'daily' | 'weekly' | 'none'
  }
  gamification: {
    enableAchievements: boolean
    enableLeaderboard: boolean
  }
  monitoring: {
    autoDetectEnabled: boolean
    excludedChannels: string[]
  }
}

interface UserPreferences {
  notifications: boolean
  digestFrequency: 'daily' | 'weekly' | 'none'
  displayInLeaderboard: boolean
}

interface Charge {
  id: string
  userId: string
  wordId: string
  amount: number
  context?: string
  channelId?: string
  messageTs?: string
  createdAt: string
}

interface JargonWord {
  id: string
  word: string
  definition: string
  example?: string
  price: number
  severity: number
  useCount: number
  totalCharged: number
}
```

## Error Handling

All endpoints return standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Server Error

Error Response Format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {} // Optional additional information
  }
}
```

## Rate Limiting

- Headers included in all responses:
  - X-RateLimit-Limit
  - X-RateLimit-Remaining
  - X-RateLimit-Reset

## Pagination

- Endpoints that return lists support:
  - page (default: 1)
  - limit (default: 50, max: 100)
- Response includes:
  - total: total number of items
  - pages: total number of pages 

## Slack Integration Details

### Required Slack Permissions

- channels:read
- channels:history
- commands
- users:read
- chat:write

### Webhook Payload Examples

```typescript
interface SlackEventPayload {
  type: string
  event: {
    type: string
    user: string
    text: string
    channel: string
    ts: string
  }
  team_id: string
}

interface SlackCommandResponse {
  response_type: "in_channel" | "ephemeral"
  text: string
  attachments?: Array<{
    title?: string
    text?: string
    fields?: Array<{
      title: string
      value: string
      short: boolean
    }>
  }>
}
```

### Authentication Flow
1. User clicks "Add to Slack"
2. Redirect to Slack OAuth
3. Slack redirects to `/workspaces/install` with code
4. Exchange code for tokens
5. Store tokens securely
6. Create workspace and initial user records 