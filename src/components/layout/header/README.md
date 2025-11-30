# Header Component Architecture

## Overview

Professional, Amazon-inspired header component with clean architecture and expert-level code quality.

## Structure

```
header/
├── index.tsx          # Main header component (orchestrator)
├── logo.tsx           # Logo component with hover effects
├── search-bar.tsx     # Prominent search bar with clear button
├── user-menu.tsx      # Account menu with favorites & cart
├── navigation.tsx     # Main navigation links
├── secondary-nav.tsx  # Category-based secondary navigation
└── mobile-menu.tsx    # Mobile slide-out menu
```

## Features

### 🎨 Design
- **Amazon-inspired**: Clean, professional layout
- **Responsive**: Mobile-first approach with breakpoints
- **Visual Hierarchy**: Clear separation of sections
- **Hover Effects**: Smooth transitions and interactions
- **Shadows & Borders**: Subtle depth and definition

### 🔧 Functionality
- **Search**: Prominent search bar with clear button
- **Navigation**: Active state indicators
- **User Menu**: Account dropdown with favorites count
- **Favorites**: Quick access with badge counter
- **Cart**: Shopping cart indicator (placeholder)
- **Theme Toggle**: Dark/light mode switching
- **Mobile Menu**: Slide-out navigation for mobile

### ♿ Accessibility
- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Clear focus indicators
- **Semantic HTML**: Proper use of nav, header, etc.

### 📱 Responsive Breakpoints
- **Mobile**: < 640px - Stacked layout, mobile menu
- **Tablet**: 640px - 1024px - Adjusted spacing
- **Desktop**: > 1024px - Full navigation, secondary nav

## Component Details

### Main Header (`index.tsx`)
- Orchestrates all header sections
- Manages responsive layout
- Handles authentication state

### Logo (`logo.tsx`)
- Animated hover effects
- Gradient glow on hover
- Responsive sizing

### Search Bar (`search-bar.tsx`)
- Prominent center position
- Clear button on input
- Voice search icon (visual)
- Focus states with ring effects

### User Menu (`user-menu.tsx`)
- Account dropdown
- Favorites button with badge
- Cart button with badge
- Theme toggle in dropdown

### Navigation (`navigation.tsx`)
- Active state indicators
- Icon support
- Smooth transitions

### Secondary Nav (`secondary-nav.tsx`)
- Category links
- Active category highlighting
- Horizontal scroll on mobile

### Mobile Menu (`mobile-menu.tsx`)
- Slide-out sheet
- User info section
- Navigation items
- Logout button

## Usage

```tsx
import { Header } from "@/components/layout/header";

// In your layout
<Header />
```

## Styling

Uses Tailwind utilities from `@/lib/tailwind-utils`:
- `spacing.container` - Container spacing
- `transitions.colors` - Color transitions
- `transitions.default` - Default transitions

## Best Practices

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components are modular and reusable
3. **Type Safety**: Full TypeScript coverage
4. **Performance**: Optimized renders with proper memoization
5. **Accessibility**: WCAG 2.1 AA compliant

## Future Enhancements

- [ ] Search suggestions dropdown
- [ ] Recent searches
- [ ] Voice search functionality
- [ ] Shopping cart integration
- [ ] Notification bell
- [ ] Language selector

---

**Built with ❤️ following senior-level best practices**

