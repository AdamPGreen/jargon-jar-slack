# Jargon Jar - MVP Scope

## Overview
The Minimum Viable Product (MVP) for Jargon Jar will focus on delivering the core functionality of tracking corporate jargon usage in Slack workspaces, with just enough features to provide value while maintaining simplicity in implementation.

## Core MVP Features

### 1. Slack Integration (Essential)
- **Manual Reporting Only** (Phase 1)
  - ✅ `/jargon help` - View available commands
  - `/jargon charge @user <word>` - Basic charge command
  - ✅ `/jargon add <word or phrase> <price>` - Add new word (fully implemented with database)
  - ✅ `/jargon list` - View all tracked words

### 2. Jar Management (Essential)
- ✅ One jar per Slack workspace
- Pre-loaded list of common jargon words with fixed prices
- Basic word management:
  - ✅ `/jargon add` command features:
    - ✅ Multi-word phrase support
    - ✅ Price validation
    - ✅ Duplicate checking
    - ✅ Database integration
  - ✅ `/jargon list` - View all words with prices and usage counts

### 3. User Management (Essential)
- Automatic user inclusion based on Slack workspace
- No manual registration needed
- Simple user profile tracking:
  - Total charges
  - Words used

### 4. Basic Statistics (Essential)
- **User Level**
  - ✅ Total amount charged
  - ✅ Most used words
- **Workspace Level**
  - ✅ Simple leaderboard
  - Basic command:
    - ✅ `/jargon stats` - View personal or workspace stats
    - ✅ `/jargon leaderboard` - View workspace rankings

### 5. Simple Web Dashboard
- React-based SPA with TypeScript
- Authentication:
  - ✅ Slack OAuth configuration
  - ✅ Database schema for sessions
  - ✅ Basic auth routes implemented
  - 🔄 Session management (in progress)
  - ⏳ Frontend auth flow
- Core views:
  - ⏳ Workspace leaderboard with real-time updates
  - ⏳ Personal statistics with charts
  - ⏳ Word list with management features
- Basic features:
  - ⏳ Responsive design
  - ⏳ Real-time updates via WebSocket
  - ⏳ Interactive charts for statistics
  - ⏳ Basic caching for performance

## Technical MVP Scope

### Backend
- Node.js + Express
- PostgreSQL database
- Basic Slack app integration
- Simple REST API for dashboard

### Database
- Core tables only:
  - Workspaces
  - Users
  - Words
  - Charges

### Security
- Standard Slack OAuth
- Basic rate limiting
- Public visibility of all data

## Not Included in MVP
To maintain focus, the following features are explicitly excluded from the MVP:

1. **Automatic Detection**
   - No automatic message scanning
   - No channel monitoring

2. **Advanced Gamification**
   - No achievements/badges
   - No streaks tracking
   - No special events

3. **Advanced Analytics**
   - No time-based patterns
   - No department comparisons
   - No trend analysis

4. **Extra Features**
   - No custom GIFs/memes
   - No translation services
   - No offline reporting
   - No digests or notifications

## MVP Success Criteria
The MVP will be considered successful if:

1. Users can easily report jargon usage
2. Basic statistics are accurately tracked
3. The leaderboard creates engagement
4. The system handles multiple workspaces reliably
5. Performance is responsive (< 1s for commands)

## Post-MVP Priorities
After MVP launch and validation, priority additions would be:

1. Automatic jargon detection
2. Basic achievements system
3. Enhanced analytics
4. Improved word management

## Implementation Phases

### Phase 1: Basic App Structure
1. **Initial App Setup**
   - ✅ Vite + React setup
   - ✅ Basic folder structure
   - ✅ Brand fonts and theme

2. **Core App Shell**
   - ⏳ Create basic App.tsx with minimal structure
   - ⏳ Add Chakra Provider
   - ⏳ Test that theme and fonts are working

3. **Basic Routing**
   - ⏳ Install React Router
   - ⏳ Set up basic routes for:
     - Dashboard (main view)
     - Profile
   - ⏳ Test navigation works

4. **Layout Foundation**
   - ⏳ Create basic layout component
   - ⏳ Add header with navigation
   - ⏳ Test responsive behavior

### Phase 2: Authentication
1. **Slack OAuth Setup**
   - ✅ Add login route
   - ✅ Create OAuth redirect handler
   - ✅ Test auth flow
   - 🔄 Fix type issues

2. **Protected Routes**
   - ✅ Add auth check middleware
   - 🔄 Create session management
   - ⏳ Handle unauthorized access

### Phase 3: Core Features
1. **Dashboard View**
   - Create dashboard layout
   - Add placeholder stats sections
   - Test responsive layout
   - Commit dashboard structure

2. **Profile View**
   - Create profile layout
   - Add user info section
   - Add personal stats section
   - Commit profile structure

### Phase 4: Data Integration
1. **API Integration**
   - Set up API client
   - Add basic data fetching
   - Create loading states
   - Commit API integration

2. **Real-time Updates**
   - Add WebSocket connection
   - Handle live updates
   - Test real-time flow
   - Commit WebSocket setup

Each implementation step follows these guidelines:
1. Start with a new feature branch
2. Focus on one small piece
3. Be testable independently
4. Include documentation updates
5. End with a clean commit
6. Be pushed to GitHub 