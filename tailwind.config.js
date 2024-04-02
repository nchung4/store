/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Montserrat", "sans-serif;"],
      },
      colors: {
        gray1: "#CBC9C9",
        err: "#F50E0E",
      },
    },
  },
  plugins: [],
};
