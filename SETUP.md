# Team1 Africa Website - Setup Guide

## 🚀 What's Been Set Up

This project now includes a comprehensive design system with:

- **shadcn/ui** - Beautiful, accessible UI components
- **Framer Motion** - Smooth animations and transitions
- **Custom Hooks** - Reusable React hooks for common functionality
- **Design System** - Comprehensive color palette, spacing, and typography
- **Custom CSS** - Global styles with CSS custom properties

## 📦 Installed Packages

### Core Dependencies
- `framer-motion` - Animation library
- `@radix-ui/react-slot` - Radix UI primitives
- `class-variance-authority` - Component variant management
- `clsx` - Conditional className utility
- `tailwind-merge` - Tailwind class merging utility
- `lucide-react` - Icon library

### Development Dependencies
- `@shadcn/ui` - UI component library CLI

## 🎨 Design System

### Colors
The project includes a comprehensive color system with:

- **Primary Colors** - African-inspired orange/amber palette
- **Secondary Colors** - Earth tones
- **Accent Colors** - Vibrant reds
- **Semantic Colors** - Success, warning, error states
- **Neutral Colors** - Grayscale palette

### Typography
- **Inter** - Primary sans-serif font for body text
- **Poppins** - Secondary font for headings
- **Playfair Display** - Display font for hero sections
- **Roboto Mono** - Monospace font for code

### Spacing & Layout
- 4px grid system for consistent spacing
- Responsive breakpoints (xs, sm, md, lg, xl, 2xl)
- Container max-widths for different screen sizes

## 🪝 Custom Hooks

### `useLocalStorage`
Persist data in localStorage with TypeScript support.

```tsx
const [value, setValue] = useLocalStorage('key', initialValue)
```

### `useMediaQuery`
Responsive design hook for media queries.

```tsx
const isMobile = useMediaQuery('(max-width: 768px)')
```

### `useBreakpoint`
Predefined breakpoint hook for responsive design.

```tsx
const { isMobile, isTablet, isDesktop } = useBreakpoint()
```

### `useScrollPosition`
Track scroll position with direction detection.

```tsx
const { scrollPosition, direction } = useScrollPosition()
```

## 🎭 Animation System

### Motion Variants
Pre-built animation variants for common use cases:

- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`
- `staggerContainer`, `staggerItem` for list animations
- `hoverScale`, `hoverLift`, `hoverGlow` for hover effects
- `cardHover`, `buttonTap` for component interactions

### Usage Example
```tsx
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.h1 variants={fadeInUp}>
    Animated Title
  </motion.h1>
</motion.div>
```

## 🎨 CSS Custom Properties

The project includes CSS custom properties for:

- Colors (primary, secondary, accent, semantic, neutral)
- Spacing (4px grid system)
- Border radius
- Shadows
- Transitions
- Z-index scale
- Typography (fonts, sizes, weights, line heights)

### Usage
```css
.my-component {
  background-color: var(--color-primary-500);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
}
```

## 🧩 shadcn/ui Components

### Available Components
- `Button` - Various button styles and variants
- `Card` - Content containers with header, content, and footer
- `Input` - Form input fields
- `Label` - Form labels

### Adding More Components
```bash
npx shadcn@latest add [component-name]
```

## 📁 Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom React hooks
│   ├── index.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   └── useScrollPosition.ts
├── lib/              # Utility libraries
│   ├── index.ts
│   ├── utils.ts      # shadcn/ui utilities
│   ├── colors.ts     # Color system
│   ├── design-tokens.ts # Design tokens
│   ├── motion.ts     # Animation variants
│   └── fonts.ts      # Font configurations
├── styles/
│   └── globals.css   # Global styles and CSS variables
└── App.tsx           # Main application component
```

## 🚀 Getting Started

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎯 Best Practices

### Using Custom Hooks
- Import from `@/hooks` for easy access
- Use TypeScript generics for type safety
- Handle SSR gracefully with window checks

### Animation Guidelines
- Use `whileHover` and `whileTap` for interactive elements
- Implement `variants` for complex animations
- Use `staggerChildren` for list animations
- Keep animations subtle and purposeful

### Design System Usage
- Use CSS custom properties for consistent theming
- Leverage the spacing scale for layout
- Apply semantic colors for different states
- Use the typography scale for text hierarchy

## 🔧 Configuration Files

### `components.json`
shadcn/ui configuration with:
- Style: New York (recommended)
- Base color: Zinc
- CSS variables enabled
- Tailwind CSS integration

### `tailwind.config.js`
Extended with shadcn/ui configuration and custom color palette.

### `tsconfig.json`
Configured with path aliases:
- `@/*` → `./src/*`

## 🌟 Next Steps

1. **Add more shadcn/ui components** as needed
2. **Create additional custom hooks** for specific functionality
3. **Extend the design system** with new patterns
4. **Add more animation variants** for specific use cases
5. **Implement dark mode** using CSS custom properties
6. **Add more responsive utilities** and breakpoint hooks

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)

---

Happy coding! 🎉
