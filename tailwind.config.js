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
        'lt-1024': { 'max': '1023px' }, // Tablet and below
        'lt-768': { 'max': '767px' },   // Large phone and below
        'lt-480': { 'max': '479px' },   // Small phone
        'ultrawide': '1600px',          // Ultrawide monitors
      },
      // Max width constraint for centered content on ultrawide screens
      maxWidth: {
        'site-lg': '1400px',
        'site-nav': '1800px', // Slightly wider for navbar
      },
    },
  },
  plugins: [],
}

