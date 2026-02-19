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
        // PRIMARY: Deep Crimson Red (replaces blue-900)
        primary: {
          DEFAULT: '#7f1d1d', // red-900
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // SECONDARY: Warm Amber/Gold
        secondary: {
          DEFAULT: '#d97706', // amber-600
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // ACCENT: Gold
        accent: {
          DEFAULT: '#d4af37',
        },
      },
      backgroundImage: {
        'heavenly': 'linear-gradient(to right, #7f1d1d, #ea580c, #d97706)',
        'heavenly-dark': 'linear-gradient(to right, #450a0a, #9a3412, #b45309)',
        'heavenly-br': 'linear-gradient(to bottom right, #7f1d1d, #c2410c, #d97706)',
      },
    },
  },
  plugins: [],
}