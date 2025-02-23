# Jargon Jar - Slack Integration

## App Configuration

### Basic Information
- App Name: Jargon Jar
- Short Description: Track and charge for corporate jargon usage
- Background Color: #4A154B (Slack purple)

### OAuth & Permissions
```yaml
Bot Token Scopes:
  - channels:history
  - channels:read
  - commands
  - users:read
  - chat:write

User Token Scopes:
  - None required
```

### Slash Commands

```yaml
/jargon charge:
  description: "Charge someone for using jargon"
  usage: "/jargon charge @user <word> [context]"
  example: "/jargon charge @sarah synergy in today's meeting"
  response: "💰 @sarah has been charged $5 for using 'synergy'"

/jargon stats:
  description: "View jargon statistics"
  usage: "/jargon stats [user]"
  example: "/jargon stats @john"
  response: "📊 Statistics for @john..."

/jargon add:
  description: "Add a new jargon word"
  usage: "/jargon add <word> <price> [definition]"
  example: "/jargon add paradigm-shift 5 completely changing direction"
  response: "✨ Added 'paradigm-shift' to the jargon jar"

/jargon leaderboard:
  description: "Show the workspace leaderboard"
  usage: "/jargon leaderboard [weekly|monthly|all]"
  example: "/jargon leaderboard weekly"
  response: "🏆 This Week's Biggest Offenders..."

/jargon help:
  description: "Show help information"
  usage: "/jargon help [command]"
  example: "/jargon help charge"
  response: "Available commands..."
```

## Event Handling

### Message Events
```yaml
event_type: message
handling:
  - Check if channel is monitored
  - Scan message for known jargon words
  - Apply charges automatically if found
  - Send notification to channel
```

### Channel Events
```yaml
join_channel:
  - Add channel to workspace
  - Default to not monitored
  - Send welcome message with setup instructions

rename_channel:
  - Update channel name in database
  - Maintain monitoring settings
```

### Team Events
```yaml
user_joined:
  - Create user record
  - Add to workspace
  - Send welcome DM

user_changed:
  - Update user details
  - Maintain statistics and achievements
```

## Message Formatting

### Charge Notifications
```yaml
Regular Charge:
  format: ":money_with_wings: @user has been charged ${amount} for using '{word}'"
  color: "#28a745"

Milestone Charge:
  format: "🎉 @user just hit ${total} in charges! Keep that corporate speak flowing!"
  color: "#17a2b8"
```

### Statistics Display
```yaml
Personal Stats:
  format: |
    📊 *Stats for @user*
    Total Charges: ${total}
    Current Streak: ${streak} days
    Most Used: ${topWords}
    Achievements: ${achievements}

Leaderboard:
  format: |
    🏆 *Jargon Leaderboard*
    1. @user1 - ${amount1}
    2. @user2 - ${amount2}
    3. @user3 - ${amount3}
```

### Achievement Notifications
```yaml
format: |
  🌟 *Achievement Unlocked!*
  @user earned: ${achievement}
  ${description}
```

## Interactive Components

### Message Actions
```yaml
Report Jargon:
  type: message_action
  text: "Report as Jargon"
  callback: handle_message_action

Quick Stats:
  type: message_action
  text: "Show Stats"
  callback: show_quick_stats
```

### Home Tab
```yaml
sections:
  - Personal Statistics
  - Recent Charges
  - Achievements
  - Leaderboard
  - Channel Settings (for admins)
refresh_rate: 5 minutes
```

## Error Handling

### Common Errors
```yaml
User Not Found:
  response: "Couldn't find that user. Make sure they're part of the workspace!"
  
Invalid Word:
  response: "That word isn't in our jargon dictionary yet. Add it with `/jargon add`!"

Rate Limited:
  response: "Whoa there! You're charging too fast. Try again in a few minutes."
```

## Best Practices

### Message Guidelines
- Keep notifications brief and humorous
- Use emojis consistently for visual cues
- Include actionable links where relevant
- Maintain casual, fun tone

### Performance
- Batch notifications when possible
- Cache user and word lookups
- Rate limit automated responses
- Use ephemeral messages for errors

### Security
- Validate user permissions for all actions
- Sanitize all user input
- Verify Slack signatures on requests
- Monitor for abuse patterns

## Testing

### Test Workspace
- Maintain test workspace for development
- Include sample data and scenarios
- Test all commands and events
- Verify rate limiting behavior

### Monitoring
- Track command usage and errors
- Monitor event processing times
- Alert on unusual patterns
- Log all admin actions

[Continue with full Slack integration details?] 