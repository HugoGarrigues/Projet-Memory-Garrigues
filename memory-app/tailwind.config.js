/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Ajout de DaisyUI
  daisyui: {
    themes: ["light", "dark"], // Active les thèmes DaisyUI
  },
};
