/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myanmar: ["Myanmar Khyay", "Arial", "sans-serif"],
        montserrat: ["Montserrat", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        "theme-blue": "#246586",
        "theme-green": "#336835",
      },
      opacity: {
        xs: "0.98",
      },
      blur: { xs: "1px" },
      screens: { custom: "1279px" },
    },
  },
  plugins: [],
};
