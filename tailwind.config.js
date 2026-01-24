// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm Terracotta/Clay Theme
        primary: {
          DEFAULT: '#C1502E', // Terracotta
          50: '#FCF1ED',
          100: '#F9E3DB',
          200: '#F3C7B7',
          300: '#EDAB93',
          400: '#E78F6F',
          500: '#E1734B',
          600: '#DB5727',
          700: '#C1502E',
          800: '#9A4025',
          900: '#73301C',
        },
        secondary: {
          DEFAULT: '#8B5A3C', // Clay Brown
          50: '#F5F0EB',
          100: '#EBE1D7',
          200: '#D7C3AF',
          300: '#C3A587',
          400: '#AF875F',
          500: '#9B6937',
          600: '#8B5A3C',
          700: '#6F4830',
          800: '#533624',
          900: '#372418',
        },
        accent: {
          light: '#FFF8F3', // Warm white
          DEFAULT: '#F5E6D3', // Cream
          dark: '#E8D4BA', // Sand
        },
        warm: {
          rust: '#B7410E', // Deep rust
          coral: '#E86252', // Coral terracotta
          sand: '#D4A574', // Sandy brown
          cream: '#F9E5D3', // Light cream
        }
      },
    },
  },
  plugins: [],
}