/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('/images/background.jpg')",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "playfair-display": ["Playfair Display", "serif"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
