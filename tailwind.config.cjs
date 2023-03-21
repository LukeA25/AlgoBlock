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
      },
      animation: {
        "cursor-flash": "cursor-flash 1s ease infinite" 
      },
      keyframes: {
        "cursor-flash": {"0%, 100%": {opacity: 0}, "25%, 75%": {opacity: 1}}
      }
    },
  },
  plugins: [],
}
