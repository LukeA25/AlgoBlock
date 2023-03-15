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
        "background": "rgba(0, 0, 0, 0.5)"
      }
    },
  },
  plugins: [],
}
