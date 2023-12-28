/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EBFDFFFF",
          150: "#C8F9FFFF",
          500: "#00BDD6FF",
          700: "#006D7CFF",
          DEFAULT: "#00BDD6FF",
        },
        rating: "#F3C63FFF",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
