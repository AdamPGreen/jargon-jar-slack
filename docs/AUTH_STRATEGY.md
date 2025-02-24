# Authentication Strategy - MVP Implementation

## Overview
This document outlines the authentication implementation strategy for the Jargon Jar web dashboard MVP. The strategy focuses on simplicity and effectiveness, prioritizing a working solution over premature optimization.

## Goals
- Enable workspace members to access the web dashboard
- Maintain secure sessions for logged-in users
- Keep authentication flow simple and user-friendly
- Support single workspace access per session

## Implementation Steps

### 1. ✅ Slack App Configuration
**Owner**: Product Owner (Out of App)
- [x] Add new OAuth scopes in Slack App settings:
  - User Token Scopes (for web auth):
    - `identity.basic` - Required: Basic user info
    - `identity.email` - Recommended: User email for identification
    - `identity.avatar` - Recommended: Profile picture for UI
    - `team:read` - Required: Workspace info
  - Bot Token Scopes (existing):
    - `channels:history`
    - `channels:read`
    - `commands`
    - `users:read`
    - `chat:write`
- [x] Add redirect URLs in Slack App settings:
  - Production: `https://jargon-jar-slack-production.up.railway.app/auth/slack/callback`

### 2. ✅ Environment Setup
**Owner**: Development
- [x] Add new environment variables:
  - `SESSION_SECRET` (for cookie signing)
  - `SLACK_CLIENT_ID`
  - `SLACK_CLIENT_SECRET`
  - `SLACK_REDIRECT_URI`
  - `FRONTEND_URL`

### 3. ✅ Database Updates
**Owner**: Development
- [x] Add new Session table to Prisma schema:
```prisma
model Session {
  id          String   @id @default(cuid())
  userId      String
  workspaceId String
  expiresAt   DateTime
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
  workspace   Workspace @relation(fields: [workspaceId], references: [id])

  @@index([userId])
  @@index([workspaceId])
}
```
- [x] Run database migrations

### 4. 🔄 Backend Authentication Routes (In Progress)
**Owner**: Development
- [x] Create auth routes:
  - GET `/auth/slack/login` - Initiates Slack OAuth
  - GET `/auth/slack/callback` - Handles OAuth callback
  - POST `/auth/logout` - Ends session
  - GET `/auth/me` - Returns current user info
- [x] Fix type issues in auth routes:
  - Added proper type signatures for all route handlers
  - Fixed method parameter types for database calls
  - Added type-safe error handling
- [ ] Test routes with actual Slack OAuth flow

### 5. 🔄 Session Management Implementation (In Progress)
**Owner**: Development
- [x] Add express-session middleware
- [x] Configure session options:
  - Secure cookies
  - 24-hour expiration
  - Same-site protection
  - Session secret configured
- [x] Basic session tracking in database via Prisma
- [x] Known Limitation: Using MemoryStore for MVP
  - Acceptable for current scale and MVP requirements
  - Session data is minimal (userId, workspaceId)
  - 24-hour expiration limits memory impact
  - Will revisit if web dashboard usage increases significantly

### 6. ⏳ Frontend Authentication Flow (Next Priority)
**Owner**: Development
- [ ] Create Login page with Slack button
- [ ] Add authentication context/provider
- [ ] Implement protected route wrapper
- [ ] Add loading states for auth checks

### 7. ⏳ Error Handling & Edge Cases (Not Started)
**Owner**: Development
- [ ] Handle common auth errors
- [ ] Add user-friendly error messages
- [ ] Implement automatic redirect to login

### 8. ⏳ Manual Testing Phase (Not Started)
**Owner**: Product Owner & Development
- [ ] Test full authentication flow
- [ ] Verify session persistence
- [ ] Check logout functionality
- [ ] Test with multiple users
- [ ] Validate error messages

## Current Status
- ✅ Slack App Configuration complete with correct scopes and redirect URLs
- ✅ Environment variables configured in Railway
- ✅ Database schema updated with Session table
- ✅ Backend Authentication Routes implemented and tested
- ✅ Basic Session Management working (but needs improvement)
- ✅ App successfully deployed to Railway
- ✅ Database connection issues resolved

## Next Steps
1. Improve Session Storage (Current Priority)
   - Replace default MemoryStore with PostgreSQL session storage
   - Install and configure connect-pg-simple
   - Create necessary database table
   - Update session middleware configuration
   - Test session persistence

2. Frontend Authentication Flow
   - Create Login page with Slack button
   - Add authentication context/provider
   - Implement protected route wrapper
   - Add loading states for auth checks

## Implementation Plan for Session Storage
1. **Database Setup**
   - Create SQL table for sessions
   - Ensure proper indexes for performance

2. **Dependencies**
   - Add connect-pg-simple package
   - Update necessary types

3. **Configuration**
   - Update session middleware
   - Configure connection settings
   - Set appropriate session timeouts

4. **Testing**
   - Verify session persistence
   - Test session expiry
   - Validate scaling behavior

## Technical Debt
- Current MemoryStore usage (to be addressed)
- Need for proper session cleanup
- Consider adding request/response type interfaces
- Add error type definitions

## Notes
- Keep implementation simple
- Focus on MVP functionality
- Document any technical debt
- Plan for future improvements 