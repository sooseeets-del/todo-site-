# UI / UX Guide

Simple to build, polished to use.

## Theme Colors

```css
:root {
  --bg: #000000;
  --surface: #111111;
  --border: #830000;
  --primary: #BC0202;
  --primary-hover: #FF0000;
  --text: #FFFFFF;
  --text-muted: #A3A3A3;
  --success: #22C55E;
  --warning: #F59E0B;
}
```

**Rules**
- White text on red buttons.
- Never use #830000 or #BC0202 as text on black (too low contrast). Use them for buttons, borders, accents.
- #FF0000 on black is fine for icons, large text, and hover glow.
- Success is green and warning is amber, so they never look like brand red.

## Typography and Spacing
- One font family (Inter or system font).
- Sizes: 12 / 14 / 16 / 20 / 24 / 32.
- Spacing in steps of 4 or 8px.
- Rounded corners: 8px for inputs and buttons, 12px for cards.

## Screens

**Landing:** short headline, one line of explanation, two buttons (Get Started, Sign In), 3 feature cards.

**Signup / Login:** centered card, clear labels, inline error messages, show/hide password.

**Dashboard:**
- Top: greeting and stats (Total, Done, Pending)
- Add-task bar always visible
- Filter tabs: All, Active, Done + search box + sort dropdown
- Task cards with checkbox, title, priority badge, due date, edit and delete icons

## UX Must-Haves
- Loading skeletons while tasks load
- Empty state: "No tasks yet. Add your first task."
- Toast messages for success and errors
- Confirm before deleting
- Inline form validation with helpful messages
- Overdue tasks marked in red, due-today in amber
- Completed tasks shown faded with strikethrough
- One primary action per screen

## Accessibility
- Visible focus outline (2px #FF0000)
- Labels on all inputs
- Keyboard-friendly (Tab, Enter, Esc closes modals)
- Touch targets at least 44px
- Respect `prefers-reduced-motion`

## Responsive
- Test at 360px, 768px, 1440px
- Mobile: single column, sticky "Add task" button
- Desktop: centered container (max 900px)

## Motion
Subtle only: 150 to 250ms fades and hover transitions.
