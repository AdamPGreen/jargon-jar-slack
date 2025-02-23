# Jargon Jar - MVP Scope

## Overview
The Minimum Viable Product (MVP) for Jargon Jar will focus on delivering the core functionality of tracking corporate jargon usage in Slack workspaces, with just enough features to provide value while maintaining simplicity in implementation.

## Core MVP Features

### 1. Slack Integration (Essential)
- **Manual Reporting Only** (Phase 1)
  - ✅ `/jargon help` - View available commands
  - `/jargon charge @user <word>` - Basic charge command
  - 🔄 `/jargon add <word> <price>` - Add new word (command handler ready, pending database integration)
  - `/jargon list` - View all tracked words

### 2. Jar Management (Essential)
- One jar per Slack workspace
- Pre-loaded list of common jargon words with fixed prices
- Basic word management:
  - 🔄 `/jargon add <word> <price>` - Command structure ready
  - Input validation implemented:
    - ✅ Proper command format
    - ✅ Valid price (positive number)
    - Pending: Database integration
  - `/jargon list` - Coming soon

### 3. User Management (Essential)
- Automatic user inclusion based on Slack workspace
- No manual registration needed
- Simple user profile tracking:
  - Total charges
  - Words used

### 4. Basic Statistics (Essential)
- **User Level**
  - Total amount charged
  - Most used words
- **Workspace Level**
  - Simple leaderboard
  - Basic command:
    - `/jargon stats` - View personal or workspace stats

### 5. Simple Web Dashboard
- View-only interface
- Basic authentication via Slack
- Core views:
  - Workspace leaderboard
  - Personal statistics
  - Word list

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

### Phase 1: Core Slack Integration
- Basic slash commands
- Simple word tracking
- Basic charge system

### Phase 2: Web Dashboard
- Simple statistics view
- Leaderboard
- Basic user profiles

### Phase 3: Polish & Launch
- Testing & bug fixes
- Performance optimization
- Documentation
- Launch preparation 