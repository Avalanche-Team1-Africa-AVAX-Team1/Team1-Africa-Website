// Design tokens for Team1 Africa Website
export const designTokens = {
  // Spacing scale (based on 4px grid)
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
  },

  // Border radius
  borderRadius: {
    none: '0px',
    sm: '2px',
    base: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
    slower: '500ms ease-in-out',
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Container max widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}

// CSS custom properties for design tokens
export const designTokenVariables = {
  // Spacing
  '--spacing-0': designTokens.spacing[0],
  '--spacing-1': designTokens.spacing[1],
  '--spacing-2': designTokens.spacing[2],
  '--spacing-3': designTokens.spacing[3],
  '--spacing-4': designTokens.spacing[4],
  '--spacing-5': designTokens.spacing[5],
  '--spacing-6': designTokens.spacing[6],
  '--spacing-8': designTokens.spacing[8],
  '--spacing-10': designTokens.spacing[10],
  '--spacing-12': designTokens.spacing[12],
  '--spacing-16': designTokens.spacing[16],
  '--spacing-20': designTokens.spacing[20],
  '--spacing-24': designTokens.spacing[24],
  '--spacing-32': designTokens.spacing[32],
  '--spacing-40': designTokens.spacing[40],
  '--spacing-48': designTokens.spacing[48],
  '--spacing-64': designTokens.spacing[64],
  '--spacing-80': designTokens.spacing[80],
  '--spacing-96': designTokens.spacing[96],

  // Border radius
  '--radius-none': designTokens.borderRadius.none,
  '--radius-sm': designTokens.borderRadius.sm,
  '--radius-base': designTokens.borderRadius.base,
  '--radius-md': designTokens.borderRadius.md,
  '--radius-lg': designTokens.borderRadius.lg,
  '--radius-xl': designTokens.borderRadius.xl,
  '--radius-2xl': designTokens.borderRadius['2xl'],
  '--radius-3xl': designTokens.borderRadius['3xl'],
  '--radius-full': designTokens.borderRadius.full,

  // Shadows
  '--shadow-none': designTokens.shadows.none,
  '--shadow-sm': designTokens.shadows.sm,
  '--shadow-base': designTokens.shadows.base,
  '--shadow-md': designTokens.shadows.md,
  '--shadow-lg': designTokens.shadows.lg,
  '--shadow-xl': designTokens.shadows.xl,
  '--shadow-2xl': designTokens.shadows['2xl'],
  '--shadow-inner': designTokens.shadows.inner,

  // Transitions
  '--transition-fast': designTokens.transitions.fast,
  '--transition-base': designTokens.transitions.base,
  '--transition-slow': designTokens.transitions.slow,
  '--transition-slower': designTokens.transitions.slower,

  // Z-index
  '--z-hide': designTokens.zIndex.hide,
  '--z-base': designTokens.zIndex.base,
  '--z-docked': designTokens.zIndex.docked,
  '--z-dropdown': designTokens.zIndex.dropdown,
  '--z-sticky': designTokens.zIndex.sticky,
  '--z-banner': designTokens.zIndex.banner,
  '--z-overlay': designTokens.zIndex.overlay,
  '--z-modal': designTokens.zIndex.modal,
  '--z-popover': designTokens.zIndex.popover,
  '--z-toast': designTokens.zIndex.toast,
  '--z-tooltip': designTokens.zIndex.tooltip,
}
