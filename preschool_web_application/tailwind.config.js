/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'xl' : '10px 20px 50px -15px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}

