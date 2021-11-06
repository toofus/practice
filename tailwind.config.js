const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: {
    enabled: false,
    content: [
      "./templates/**/*.html.twig",
      "./assets/components/**/*.{js,jsx}",
      "./assets/pages/**/*.{js,jsx}",
      "./assets/controllers/**/*.js",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Montserrat'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.sky,
        brand: "#ef7744",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
