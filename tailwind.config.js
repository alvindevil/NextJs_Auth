/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add the paths to all of your template files
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // Add this if you use a 'src' folder
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
        'spin-slower': 'spin 2s linear infinite',
        'spin-reverse-slow': 'spin-reverse 1.5s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        ripple: {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0px 10px 10px rgba(0,0,0,0.3)'
          },
          '50%': {
            transform: 'scale(1.3)',
            boxShadow: '0px 30px 20px rgba(0,0,0,0.3)'
          },
        },
        'color-change': {
          '0%, 100%': { fill: 'rgb(128,128,128)' },
          '50%': { fill: 'white' }
        },
      },
      animation: {
        ripple: 'ripple 2s ease-in-out infinite',
        'color-change': 'color-change 2s ease-in-out infinite'
      },
    },
  },
  // Add your plugin here
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography')
  ],
}
}