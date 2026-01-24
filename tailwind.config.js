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
        // Modern University Church Theme
        primary: {
          DEFAULT: '#2B2B2B', // Charcoal
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#BABABA',
          400: '#A3A3A3',
          500: '#8C8C8C',
          600: '#757575',
          700: '#5E5E5E',
          800: '#474747',
          900: '#2B2B2B',
        },
        secondary: {
          DEFAULT: '#556B2F', // Olive Green
          50: '#F4F6F0',
          100: '#E9EDE1',
          200: '#D3DBC3',
          300: '#BDC9A5',
          400: '#A7B787',
          500: '#91A569',
          600: '#7B934B',
          700: '#68783D',
          800: '#556B2F',
          900: '#425521',
        },
        accent: {
          light: '#FFFFFF',
          DEFAULT: '#F5F5F5',
          dark: '#E8E8E8',
        },
      },
    },
  },
  plugins: [],
}