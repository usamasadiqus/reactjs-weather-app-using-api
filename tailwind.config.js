/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        rainy: "url('/src/assets/images/rainy.jpg')",
        cloudy: "url('/src/assets/images/cloudy.jpg')",
        sunny: "url('/src/assets/images/sunny.jpg')",
      },
    },
  },
  plugins: [],
};
