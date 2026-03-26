const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.js", "./docs/**/*.mdx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans],
        jakarta: ['"Plus Jakarta Sans"', ...fontFamily.sans],
        mono: ['"Fira Code"', ...fontFamily.mono],
      },
      borderRadius: {
        sm: "4px",
      },
      screens: {
        sm: "0px",
        lg: "997px",
      },
      colors: {
        dark: "#111827", // optional alias
        light: "#e5e7eb",
      },
      boxShadow: {
        accent: "0 0 20px rgba(221, 117, 150, 0.4)",
        "accent-lg": "0 0 40px rgba(221, 117, 150, 0.6)",
      },
    },
  },
  plugins: [],
};
