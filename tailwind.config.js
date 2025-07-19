// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-inter)', 'Geneva'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        gray: colors.slate,
        background: {
          light: '#fefefe',
          dark: '#0f172a',
        },
        surface: {
          light: '#f8fafc',
          dark: '#1e293b',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(135deg, #fefefe 0%, #f8fafc 100%)',
        'gradient-subtle-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1': {
              fontWeight: '800',
              fontSize: '2.25rem',
              lineHeight: '2.5rem',
              letterSpacing: theme('letterSpacing.tight'),
              marginTop: '3rem',
              marginBottom: '1.5rem',
            },
            'h2': {
              fontWeight: '700',
              fontSize: '1.875rem',
              lineHeight: '2.25rem',
              letterSpacing: theme('letterSpacing.tight'),
              marginTop: '2.5rem',
              marginBottom: '1.25rem',
            },
            'h3': {
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            'h4': {
              fontWeight: '600',
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            'p': {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              lineHeight: '1.75',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: `${theme('colors.primary.300')}`,
              },
              code: { color: theme('colors.primary.300') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.slate.100'),
            },
            p: {
              color: theme('colors.slate.300'),
            },
            strong: {
              color: theme('colors.slate.100'),
            },
            code: {
              color: theme('colors.indigo.300'),
              backgroundColor: theme('colors.slate.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
