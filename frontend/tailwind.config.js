import flowbite from "flowbite-react/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Basis Grotesque alternative
        playfair: ['Playfair Display', 'serif'], // Noe Display alternative
        roman: ['Gideon Roman', 'serif'], // Noe Display alternative
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}