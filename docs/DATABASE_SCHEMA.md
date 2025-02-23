# Jargon Jar - Database Schema

## Overview
This schema supports the core Jargon Jar functionality: tracking corporate jargon usage in Slack workspaces with gamification elements.

## Core Models

### Workspace
```prisma
model Workspace {
  id            String   @id @default(cuid())
  slackTeamId   String   @unique
  name          String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  settings      Json     // Workspace configuration (notifications, themes)
  
  // Relationships
  users         WorkspaceUser[]
  jargonWords   JargonWord[]
  charges       Charge[]
  channels      Channel[]
}
```

### User
```prisma
model User {
  id            String   @id @default(cuid())
  slackUserId   String   @unique
  name          String
  email         String?
  avatarUrl     String?
  createdAt     DateTime @default(now())
  
  // Relationships
  workspaces    WorkspaceUser[]
  charges       Charge[]         // Charges received
  reports       Charge[]         @relation("Reporter") // Charges reported
  achievements  Achievement[]
}
```

### WorkspaceUser
```prisma
model WorkspaceUser {
  id            String    @id @default(cuid())
  workspaceId   String
  userId        String
  isAdmin       Boolean   @default(false)
  department    String?   // Simple department tracking
  totalCharges  Decimal   @default(0)
  streakDays    Int       @default(0)
  lastCharge    DateTime?
  preferences   Json?     // User preferences (notifications, digests)
  
  // Relationships
  workspace     Workspace @relation(fields: [workspaceId], references: [id])
  user          User      @relation(fields: [userId], references: [id])

  @@unique([workspaceId, userId])
}
```

### JargonWord
```prisma
model JargonWord {
  id          String   @id @default(cuid())
  workspaceId String
  word        String
  definition  String   // Plain English definition
  example     String?  // Example usage
  price       Decimal
  severity    Int      @default(1) // 1-5 scale
  createdAt   DateTime @default(now())
  
  // Stats
  useCount    Int      @default(0)
  totalCharged Decimal @default(0)
  
  // Relationships
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  charges     Charge[]

  @@unique([workspaceId, word])
}
```

### Charge
```prisma
model Charge {
  id          String   @id @default(cuid())
  workspaceId String
  userId      String   // User being charged
  reporterId  String   // User reporting the charge
  wordId      String
  amount      Decimal
  createdAt   DateTime @default(now())
  context     String?  // Message content or meeting context
  channelId   String?
  messageTs   String?  // Slack message timestamp
  
  // Relationships
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  user        User      @relation(fields: [userId], references: [id])
  reporter    User      @relation("Reporter", fields: [reporterId], references: [id])
  word        JargonWord @relation(fields: [wordId], references: [id])
}
```

### Channel
```prisma
model Channel {
  id            String   @id @default(cuid())
  workspaceId   String
  slackChannelId String
  name          String
  isMonitored   Boolean  @default(false)
  
  // Relationships
  workspace     Workspace @relation(fields: [workspaceId], references: [id])

  @@unique([workspaceId, slackChannelId])
}
```

### Achievement
```prisma
model Achievement {
  id          String   @id @default(cuid())
  userId      String
  workspaceId String
  type        String   // "JargonMaster", "CleanStreak", etc.
  awardedAt   DateTime @default(now())
  metadata    Json?    // Achievement-specific data
  
  // Relationships
  user        User      @relation(fields: [userId], references: [id])
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
}
```

## Indexes

```prisma
// Efficient lookups
@@index([slackTeamId])
@@index([slackUserId])
@@index([workspaceId, createdAt])
@@index([userId, createdAt])
@@index([wordId, createdAt])
```

## Data Retention
- Charges: Retain indefinitely (small payload)
- Channel Messages: Don't store
- User Data: Retain while workspace active
