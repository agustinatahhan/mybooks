/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        title: "Gambarino",
        body: "Switzer",
      },
      colors: {
        background: "#fdf7f5",
        expresso: "#3e2723",
        highlight: "#f4c9d6",
      },
    },
  },
  plugins: [],
};
