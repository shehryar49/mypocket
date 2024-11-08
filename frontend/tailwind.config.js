/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-light-cyan': '#d0f0f9',
        'custom-light-blue': '#D6ECFD',
      },
    },
  },

  
  plugins: [],
}

