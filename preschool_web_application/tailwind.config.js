/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'xl' : '10px 20px 50px -15px rgba(0, 0, 0, 0.3)',
        'ss' : '10px 10px 30px 0px rgba(0, 0, 0, 0.3)',
        'card': '0px 10px 15px -4px rgba(0, 0, 0, 0.3)'
      },
      borderRadius: {
        '15': '15px',
        '9' : '9px'
      },
      height : {
        '50' : '50px'
      },
      spacing :
      {
        'l' : '0px 10px 0px 0px'
      }
    },
  },
  plugins: [],
}

