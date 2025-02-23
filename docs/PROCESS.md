# Development Process

## Session Start Checklist
1. Current branch: [branch_name]
2. Open PRs: [list_of_prs]
3. Next planned task: [task_description]
4. Last completed feature: [feature_description]

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
- Active Branch: main
- Latest Feature: User tracking and statistics
- Next Task: Implement charge command
- Open PRs: None

## Recent Changes
- Added user tracking
- Implemented /jargon stats
- Added multi-word jargon support
- Added list command

## Known Issues
- None currently tracked

## Next Planned Features
1. Charge command implementation
2. Common jargon presets
3. User leaderboard 