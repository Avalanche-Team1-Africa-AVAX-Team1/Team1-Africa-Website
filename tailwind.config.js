/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Added custom downscale screens so we can target ranges without altering ≥1920px (4K) baseline
      screens: {
        'lt-1920': { 'max': '1919px' }, // Large laptop and below
        'lt-1440': { 'max': '1439px' }, // Laptop and below
        'lt-1280': { 'max': '1279px' }, // Small laptop / tablet landscape
        'lt-1200': { 'max': '1199px' }, // Tablet landscape / small screens
        'lt-1024': { 'max': '1023px' }, // Tablet and below
        'lt-900': { 'max': '899px' },   // Between md and lg
        'lt-768': { 'max': '767px' },   // Large phone and below
        'lt-480': { 'max': '479px' },   // Small phone
        'tablet': '900px',              // Tablet screens (900px+) - bridges md to lg gap
        'laptop': '1200px',             // Laptop screens (1200px+)
        'desktop': '1440px',            // Desktop screens (1440px+)
        'ultrawide': '1600px',          // Ultrawide monitors
      },
      // Max width constraint for centered content on ultrawide screens
      maxWidth: {
        'site-lg': '1400px',
        'site-nav': '1800px', // Slightly wider for navbar
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

