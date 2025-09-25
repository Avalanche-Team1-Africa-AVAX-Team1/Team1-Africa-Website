// Font configuration for Team1 Africa Website
// Using Google Fonts via CSS imports instead of next/font

export const fontFamilies = {
  // Primary font - Inter for body text
  inter: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  
  // Secondary font - Poppins for headings
  poppins: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  
  // Display font - Playfair Display for hero sections
  playfair: '"Playfair Display", Georgia, "Times New Roman", serif',
  
  // Monospace font - Roboto Mono for code
  robotoMono: '"Roboto Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
}

// Font variables for CSS
export const fontVariables = {
  '--font-inter': fontFamilies.inter,
  '--font-poppins': fontFamilies.poppins,
  '--font-playfair': fontFamilies.playfair,
  '--font-roboto-mono': fontFamilies.robotoMono,
}

// Font weights
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}
