# Development Process

## Session Start Checklist
1. Current branch: develop
2. Open PRs: None
3. Next planned task: Implement charge command
4. Last completed feature: User tracking and statistics

## Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- Feature branches: `feature/description`
- Fix branches: `fix/description`

## Workflow Steps
1. **Session Start**:
   ```bash
   # Check current branch
   git branch
   # Create new feature branch if needed
   git checkout -b feature/name
   ```

2. **During Development**:
   - Make focused commits
   - Test changes
   - Update documentation

3. **Feature Completion**:
   - Final testing
   - Update PROCESS.md status
   - Create PR to develop

4. **Next Session Prep**:
   - Update Session Start Checklist
   - List known issues/tasks
   - Document any pending changes

## Current Status
- Active Branch: develop
- Latest Feature: User tracking and statistics
- Next Task: Implement charge command (/jargon charge @user <word>)
- Open PRs: None

## Recent Changes
- Added user tracking
- Implemented /jargon stats
- Added multi-word jargon support
- Added list command
- Set up develop branch
- Added process documentation

## Known Issues
- None currently tracked

## Next Planned Features
1. Charge command implementation
   - Parse @user mentions
   - Validate word exists
   - Create charge record
   - Update user totals
2. Common jargon presets
3. User leaderboard 