module.exports = {
    darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
  card: {
    teal:    "var(--color-card-teal)",
    purple:  "var(--color-card-purple)",
    fuchsia: "var(--color-card-fuchsia)",
  },
  cardText: {
    teal:    "var(--color-text-teal)",
    purple:  "var(--color-text-purple)",
    fuchsia: "var(--color-text-fuchsia)",
  }
}
    },
  },
  plugins: [],
};