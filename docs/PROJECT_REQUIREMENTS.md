# Jargon Jar - Project Requirements

## Project Overview
Jargon Jar is a Slack-first application that helps teams track and "charge" users for corporate jargon usage, similar to a swear jar. The application includes both a Slack bot interface and a web dashboard for statistics and tracking.

## Core Features

### Slack Integration
- **Automatic Detection**
  - Monitor specified channels and threads for jargon usage
  - Automatically "charge" users when jargon is detected
  - Support for custom jargon words and phrases

- **Manual Reporting**
  - Slash commands for reporting jargon usage
  - Support for reporting offline usage (meetings, huddles)

### Jar Management
- One jar per Slack workspace (v1)
- All workspace members can:
  - Add new jargon words
  - Set/modify word prices
  - Report jargon usage

### User Management
- Users automatically part of their workspace's jar
- No manual user registration required
- Users can belong to multiple workspaces (and thus multiple jars)

### Statistics & Tracking
- **User Statistics**
  - Individual user totals
  - Personal usage history
  - Ranking among workspace members
  - Personal "Jargon Profile" showing favorite/most-used jargon
  - "Time of day" patterns for jargon usage
  - "Jargon Free" streaks tracking

- **Workspace Analytics**
  - Leaderboards
  - Most expensive words
  - Most frequent offenders
  - Word usage trends
  - Channel-specific statistics
  - "Word of the Day" highlighting
  - Team jargon trends over time
  - Department/team comparisons
  - "Jargon Heat Map" showing peak jargon times
  - Weekly/monthly summary reports with fun awards

### Gamification Elements
- **Achievements & Badges**
  - "Jargon Master" for frequent offenders
  - "Buzzword Bingo" for using multiple terms in one day
  - "Clean Streak" for jargon-free periods
  - "Variety Pack" for using many different terms
  - "Corporate Poet" for creative jargon combinations

- **Fun Features**
  - Random jargon generator for laughs
  - "Corporate Translator" that suggests plain English alternatives
  - Custom GIF/meme responses for specific jargon
  - Weekly "Worst Offender" ceremony
  - Optional "Shame Bell" notifications (Game of Thrones style)
  - Seasonal themes and special event tracking
  - "Jargon Mad Libs" generator
  - "Corporate Ipsum" generator for mock text
  - "Buzzword Buster" tool that simplifies jargon-heavy text

### Monetization
- V1: Track fictional charges only
- Future consideration: Real money integration

## Non-Functional Requirements

### Privacy & Security
- Public visibility of all charges and statistics
- No private/confidential data storage needed
- Standard OAuth security for Slack integration

### Scalability
- Support for multiple Slack workspaces
- Future-proofed for multiple jars per workspace

### User Experience
- Simple, intuitive interface
- Quick reporting workflow
- Fun, "punk rock" anti-corporate vibe
- Real-time updates for charges and statistics
- Playful, humorous copy throughout
- Delightful micro-interactions
- Easter eggs and hidden features
- Mobile-responsive web dashboard
- Quick reactions/emoji responses to charges
- One-click reporting from Slack
- Optional daily/weekly digest of highlights

## Future Considerations
- Multiple jars per workspace
- Real money integration
- Dispute system for charges
- Enhanced analytics

## Integration Ideas
- Optional calendar integration for "Meeting Bingo"
- Teams integration for cross-platform tracking
- Export data for team retrospectives/fun presentations

### Content Management
- **Jargon Dictionary**
  - Pre-loaded corporate jargon database
  - Snarky plain-English definitions
  - Example usage in ridiculous sentences
  - Ability for users to:
    - Submit new jargon terms
    - Suggest alternative definitions
    - Vote on best definitions
    - Tag jargon by industry/department
  
- **Dictionary Features**
  - Searchable database
  - "Jargon of the Day" with featured definition
  - "Translation" service for jargon-heavy messages
  - Severity ratings (how "corporate" is this term?)
  - Etymology/origin stories for popular terms
  - Related terms and common combinations
  - Industry-specific collections (Tech, Finance, Marketing, etc.) 