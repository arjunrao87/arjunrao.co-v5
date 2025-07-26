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
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'card-focus': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modern-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'modern-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.15)',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Geneva'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        semantic: {
          success: {
            50: '#f0fdf4',
            500: '#22c55e',
            600: '#16a34a',
          },
          warning: {
            50: '#fffbeb',
            500: '#f59e0b',
            600: '#d97706',
          },
          error: {
            50: '#fef2f2',
            500: '#ef4444',
            600: '#dc2626',
          },
        },
        gray: colors.slate,
        background: {
          light: '#fefdfb',
          dark: '#0f172a',
        },
        surface: {
          light: '#fbf9f6',
          dark: '#1e293b',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(135deg, #fefdfb 0%, #fbf9f6 40%, #f7f5f1 100%)',
        'gradient-subtle-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 100%)',
        'gradient-mesh': `
          radial-gradient(at 40% 20%, hsla(28,100%,74%,0.05) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(189,100%,56%,0.05) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(355,100%,93%,0.05) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(340,100%,76%,0.05) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(22,100%,77%,0.05) 0px, transparent 50%),
          radial-gradient(at 80% 100%, hsla(242,100%,70%,0.05) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(343,100%,76%,0.05) 0px, transparent 50%)
        `,
        'gradient-mesh-dark': `
          radial-gradient(at 40% 20%, hsla(28,100%,74%,0.03) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(189,100%,56%,0.03) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(355,100%,93%,0.03) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(340,100%,76%,0.03) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(22,100%,77%,0.03) 0px, transparent 50%),
          radial-gradient(at 80% 100%, hsla(242,100%,70%,0.03) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(343,100%,76%,0.03) 0px, transparent 50%)
        `,
        'gradient-hero': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #f0f9ff 100%)',
        'gradient-hero-dark': 'linear-gradient(135deg, #082f49 0%, #0c4a6e 25%, #075985 50%, #082f49 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
        'gradient-card-dark': 'linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            fontSize: '18px',
            lineHeight: '1.7',
            color: theme('colors.slate.700'),
            a: {
              color: theme('colors.primary.600'),
              fontWeight: '500',
              textDecorationThickness: '2px',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecorationColor: theme('colors.primary.700'),
              },
              code: { color: theme('colors.primary.500') },
            },
            'h1': {
              fontWeight: '800',
              fontSize: '2.5rem',
              lineHeight: '1.1',
              letterSpacing: '-0.025em',
              marginTop: '3rem',
              marginBottom: '1.5rem',
              color: theme('colors.slate.900'),
            },
            'h2': {
              fontWeight: '700',
              fontSize: '2rem',
              lineHeight: '1.2',
              letterSpacing: '-0.025em',
              marginTop: '2.5rem',
              marginBottom: '1.25rem',
              color: theme('colors.slate.900'),
            },
            'h3': {
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '1.3',
              letterSpacing: '-0.015em',
              marginTop: '2rem',
              marginBottom: '1rem',
              color: theme('colors.slate.800'),
            },
            'h4': {
              fontWeight: '600',
              fontSize: '1.25rem',
              lineHeight: '1.4',
              letterSpacing: '-0.01em',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              color: theme('colors.slate.800'),
            },
            'p': {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              lineHeight: '1.7',
              color: theme('colors.slate.600'),
            },
            'strong': {
              fontWeight: '600',
              color: theme('colors.slate.900'),
            },
            'blockquote': {
              borderLeftColor: theme('colors.primary.500'),
              borderLeftWidth: '4px',
              fontStyle: 'normal',
              fontWeight: '500',
              color: theme('colors.slate.700'),
              paddingLeft: '1.5rem',
              marginLeft: '0',
            },
            code: {
              color: theme('colors.primary.600'),
              backgroundColor: theme('colors.primary.50'),
              fontWeight: '500',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontSize: '0.875em',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.slate.300'),
            a: {
              color: theme('colors.primary.400'),
              fontWeight: '500',
              textDecorationThickness: '2px',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: theme('colors.primary.300'),
                textDecorationColor: theme('colors.primary.300'),
              },
              code: { color: theme('colors.primary.300') },
            },
            'h1': {
              color: theme('colors.slate.50'),
              fontWeight: '800',
              letterSpacing: '-0.025em',
            },
            'h2': {
              color: theme('colors.slate.50'),
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            'h3,h4,h5,h6': {
              color: theme('colors.slate.100'),
              fontWeight: '600',
            },
            'p': {
              color: theme('colors.slate.300'),
              lineHeight: '1.7',
            },
            'strong': {
              color: theme('colors.slate.100'),
              fontWeight: '600',
            },
            'blockquote': {
              borderLeftColor: theme('colors.primary.400'),
              color: theme('colors.slate.300'),
              fontWeight: '500',
            },
            'code': {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.slate.800'),
              fontWeight: '500',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
