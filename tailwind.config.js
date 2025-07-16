/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add the paths to all of your template files
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // Add this if you use a 'src' folder
  ],
  theme: {
    extend: {},
  },
  // Add your plugin here
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}