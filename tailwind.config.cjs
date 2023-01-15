/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        secendaryColor : "#1E222C",
        mainColor: "#17191F"
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
