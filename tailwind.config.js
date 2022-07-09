module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      color: {
        "light-blue": "#55a3ff",
      },
      backgroundColor: {
        "light-blue": "#55a3ff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};
