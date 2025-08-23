/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'rgb(229 231 235)', // gray-200
        background: 'rgb(249 250 251)', // gray-50
        foreground: 'rgb(17 24 39)', // gray-900
      },
      spacing: {
        'safe-area-pt': 'env(safe-area-inset-top)',
        'safe-area-pb': 'env(safe-area-inset-bottom)',
        'safe-area-pl': 'env(safe-area-inset-left)',
        'safe-area-pr': 'env(safe-area-inset-right)',
      },
      screens: {
        'xs': '475px',
        'touch': { 'raw': '(hover: none)' },
        'mouse': { 'raw': '(hover: hover)' },
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.safe-area-pt': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-area-pb': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-area-pl': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-area-pr': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.touch-manipulation': {
          touchAction: 'manipulation',
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};