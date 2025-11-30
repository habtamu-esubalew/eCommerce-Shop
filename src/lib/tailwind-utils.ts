/**
 * Tailwind CSS utility functions and class collections
 * Expert-level Tailwind patterns for maintainability
 */

export const spacing = {
  container: "container mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-4 sm:py-6 lg:py-8",
  card: "p-4 sm:p-6",
} as const;

export const layout = {
  grid: {
    products: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
    details: "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8",
  },
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-center justify-start",
    end: "flex items-center justify-end",
    col: "flex flex-col",
  },
} as const;

export const typography = {
  heading: {
    h1: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
    h2: "text-2xl sm:text-3xl font-bold tracking-tight",
    h3: "text-xl sm:text-2xl font-semibold",
    h4: "text-lg sm:text-xl font-semibold",
  },
  body: {
    large: "text-base sm:text-lg",
    base: "text-sm sm:text-base",
    small: "text-xs sm:text-sm",
  },
} as const;

export const transitions = {
  default: "transition-all duration-200 ease-in-out",
  fast: "transition-all duration-150 ease-in-out",
  slow: "transition-all duration-300 ease-in-out",
  colors: "transition-colors duration-200",
  transform: "transition-transform duration-300 ease-out",
} as const;

export const effects = {
  card: "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow",
  cardHover: "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
  imageHover: "group-hover:scale-105 transition-transform duration-300",
} as const;

export const states = {
  loading: "opacity-50 pointer-events-none",
  disabled: "opacity-50 cursor-not-allowed",
  focus: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
} as const;

