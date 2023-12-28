/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (_) => ({
        "custom-bg":
          "url(/Users/sanketmane/Documents/React js/todo app/public/bg.jpg)",
      }),
    },
  },
  plugins: [],
};

