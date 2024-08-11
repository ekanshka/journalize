/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Basis Grotesque alternative
        playfair: ['Playfair Display', 'serif'], // Noe Display alternative
      },
    },
  },
  plugins: [],
}