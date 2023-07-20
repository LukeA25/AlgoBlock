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
        "shaded-250": "rgba(0, 0, 0, 0.25)",
        "shaded-500": "rgba(0, 0, 0, 0.5)",
        "shaded-750": "rgba(0, 0, 0, 0.75)",
      },
      animation: {
        "cursor-flash": "cursor-flash 1s ease infinite",
        "stock-cover": "stock-cover 5s linear infinite",
        "buy-flash": "buy-flash 5s linear infinite",
        "sell-flash": "sell-flash 5s linear infinite"
      },
      keyframes: {
        "cursor-flash": {"0%, 100%": {opacity: 0}, "25%, 60%": {opacity: 1}},
        "stock-cover": {"0%": {left: 0}, "75%, 100%": {left: "100%"}},
        "buy-flash": {"0%, 9%, 18%, 21%": {opacity: 0}, "12%, 15%, 24%, 100%": {opacity: 1}},
        "sell-flash": {"0%, 69%, 78%, 81%": {opacity: 0}, "72%, 75%, 84%, 100%": {opacity: 1}}
      }
    },
  },
}
