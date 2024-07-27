/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["/**{html,css}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      defaultFlavour: "macchiato",
    }),
  ],
}

