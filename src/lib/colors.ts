// Color palette for Team1 Africa Website - Based on actual design usage
export const colors = {
  // Core colors - What you actually use
  primary: {
    // Black variations for text and dark elements
    black: '#000000',
    'black-soft': '#171717',
    'black-medium': '#262626',
    
    // White variations for backgrounds and light text
    white: '#ffffff',
    'white-off': '#fafafa',
    'white-warm': '#fef7ee',
    
    // Grey variations for secondary text and borders
    grey: {
      50: '#fafafa',
      100: '#f5f5f5', 
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },
  
  // Accent colors - Red for highlights and CTAs
  accent: {
    red: '#ef4444',
    'red-dark': '#dc2626',
    'red-darker': '#b91c1c',
    'red-light': '#fca5a5',
    'red-lighter': '#fef2f2',
  },
  
  // Semantic colors - Only what you need
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Background variations
  background: {
    light: '#ffffff',
    dark: '#000000',
    'dark-soft': '#171717',
    'grey-light': '#fafafa',
  }
}

// CSS custom properties - Only the colors you'll actually use
export const colorVariables = {
  // Core colors
  '--color-black': colors.primary.black,
  '--color-white': colors.primary.white,
  '--color-grey-50': colors.primary.grey[50],
  '--color-grey-100': colors.primary.grey[100],
  '--color-grey-200': colors.primary.grey[200],
  '--color-grey-300': colors.primary.grey[300],
  '--color-grey-400': colors.primary.grey[400],
  '--color-grey-500': colors.primary.grey[500],
  '--color-grey-600': colors.primary.grey[600],
  '--color-grey-700': colors.primary.grey[700],
  '--color-grey-800': colors.primary.grey[800],
  '--color-grey-900': colors.primary.grey[900],
  
  // Accent colors
  '--color-red': colors.accent.red,
  '--color-red-dark': colors.accent['red-dark'],
  '--color-red-light': colors.accent['red-light'],
  
  // Semantic colors
  '--color-success': colors.success,
  '--color-warning': colors.warning,
  '--color-error': colors.error,
  
  // Background colors
  '--color-bg-light': colors.background.light,
  '--color-bg-dark': colors.background.dark,
  '--color-bg-grey': colors.background['grey-light'],
}
