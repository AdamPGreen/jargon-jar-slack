# Jargon Jar - Brand & Design Guide

## Brand Identity

### Core Concept
Jargon Jar is the rebellious whistleblower in the corporate world – sophisticated enough to infiltrate the boardroom, punk rock enough to call out the BS. Think of it as the digital equivalent of rolling your eyes at "synergistic paradigm shifts" while wearing a perfectly tailored suit.

### Voice & Tone
- **Personality**: Sarcastic, witty, and unapologetically anti-corporate
- **Style**: Professional polish meets punk rock attitude
- **Communication**: Clear, direct, and occasionally delightfully irreverent
- **Humor**: Sharp, intelligent, and always punching up
- **Character**: The office rebel in a clean-cut disguise

## Visual Design

### Color Palette

#### Primary Colors
- **Brand Orange**: `#FF5D1F` - A vibrant, modern orange that commands attention
- **Midnight**: `#1A1A1A` - Deep, sophisticated black for contrast

#### Secondary Colors
- **Slate**: `#F7F7F7` → `#2D3748` - Clean grays for that Airbnb-esque sophistication
- **Alert Green**: `#00BA88` - Success states, positive trends
- **Warning Yellow**: `#F4B740` - Notifications, moderate alerts
- **Rebellion Red**: `#FF4444` - Error states, urgent alerts

#### Accent Colors
- **Subtle Peach**: `#FFF1EC` - Light orange tint for backgrounds
- **Deep Ocean**: `#2C5282` - Professional accent for CTAs
- **Cool Gray**: `#EDF2F7` - Subtle backgrounds, cards

### Typography

#### Primary Font
- **Body & UI**: Inter
  - Regular (400) for body text
  - Medium (500) for emphasis
  - Semi-bold (600) for sub-headings
  - Bold (700) for strong emphasis

#### Brand Font
- **Headlines & CTAs**: Druk Wide
  - Bold for maximum impact
  - Used sparingly for main headlines and key branded elements
  - Brings the punk rock attitude while maintaining sophistication

### Design Principles

#### Layout
- Clean, generous whitespace (Airbnb-style)
- Strong grid system
- Clear visual hierarchy
- Responsive and adaptive

#### Components
- Modern, minimal base styles
- Subtle hover states
- Smooth transitions
- Occasional "rebellious" elements that break the grid

### UI Elements

#### Buttons
- Clean, minimal shapes
- Bold, confident hover states
- Punk rock micro-interactions
- Example CTA text:
  - "Bust Some Jargon"
  - "Call It Out"
  - "Add to the Rebellion"

#### Cards & Containers
- Clean, subtle shadows
- Minimal borders
- Generous padding
- Occasional tilted elements for attitude

#### Icons & Graphics
- Modern, line-based icons
- Occasional "hand-drawn" elements
- Strategic use of emoji in UI
- Custom illustrations mixing corporate and rebel elements

### Interaction & Animation

#### Micro-interactions
- Subtle, professional base states
- Punchy, rebellious active states
- Example: Button transforms from clean rectangle to slightly tilted on hover

#### Loading States
- Clean spinners for professional areas
- Humorous messages for loading states
- Progress bars with attitude

### Voice Examples

#### Success Messages
- "Jargon Successfully Called Out 🎯"
- "Another One Bites the Dust 💀"
- "Corporate Speak: Demolished 🏴‍☠️"

#### Error Messages
- "Whoa There, Corporate Overlord"
- "Error 404: Synergy Not Found"
- "Even AI Can't Parse That Jargon"

#### Empty States
- "Clean as a Quarterly Report"
- "Squeaky Clean (Unlike Office Politics)"
- "Nothing to See Here (Yet)"

## Implementation Notes

### CSS Custom Properties
```css
:root {
  /* Colors */
  --jj-orange: #FF5D1F;
  --jj-midnight: #1A1A1A;
  --jj-slate-100: #F7F7F7;
  --jj-slate-900: #2D3748;
  
  /* Fonts */
  --font-body: 'Inter', system-ui, sans-serif;
  --font-brand: 'Druk Wide', 'Inter', sans-serif;
  
  /* Spacing */
  --space-unit: 4px;
  --space-xs: calc(var(--space-unit) * 2);
  --space-sm: calc(var(--space-unit) * 4);
  --space-md: calc(var(--space-unit) * 6);
  --space-lg: calc(var(--space-unit) * 8);
  --space-xl: calc(var(--space-unit) * 12);
}
```

### Accessibility
- All color combinations meet WCAG 2.1 AA standards
- Interactive elements have clear focus states
- Sufficient color contrast in all states
- Clear visual hierarchy for screen readers

### Responsive Design
- Mobile-first approach
- Breakpoints aligned with standard device sizes
- Flexible grid system
- Maintains attitude across all screen sizes 