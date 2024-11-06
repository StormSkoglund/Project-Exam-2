/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-blue": "#1E6F98",
        "theme-green": "#48924A",
      },
      opacity: {
        xs: "0.98",
      },
    },
  },
  plugins: [],
};
