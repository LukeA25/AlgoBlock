/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "mono": ["courier", "monospace", "serif"]
    },
    extend: {
      colors: {
        "shaded-500": "rgba(0, 0, 0, 0.5)",
        "shaded-750": "rgba(0, 0, 0, 0.75)",
      }
    },
  },
  plugins: [],
}
