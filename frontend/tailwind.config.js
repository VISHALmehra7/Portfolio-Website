/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
           "auth-bg":"url('authbg.jpg')"
      },
      colors:{
        "bg-color":"#E6E6E6",
        "bg-div": "#1C1C1C",
        "bg-main":"#E4E4E4"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

