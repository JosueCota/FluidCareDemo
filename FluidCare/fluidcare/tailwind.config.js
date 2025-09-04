/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue: {
          300: "#5858ec",
          200: "#48E0FB",
          100: "#DFF5FF"
        },
        grey: {
          300: "#322F2F",
          200: "#444",
          150: "#9f9ba0",
          100: "#EEFBFC"
        },
        success: "#9BEFB2",
        danger: "#F69595",
        warning: "#FDFAA5",
        offwhite: "#F5F5F5",
        lightgrey: "#D9D9D9"
      },
    },
  },
  plugins: [],
}

