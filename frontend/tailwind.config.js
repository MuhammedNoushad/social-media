/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/aspect-ratio"),
    // eslint-disable-next-line no-undef
    require("daisyui"),
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar-hide"), // Adding the scrollbar-hide plugin
  ],
  darkMode: false,
};
