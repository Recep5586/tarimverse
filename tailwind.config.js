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
    },
  },
  plugins: [],
};