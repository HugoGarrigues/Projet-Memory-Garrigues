module.exports = {
    content: [
      "./index.html",   // Inclure l'index.html pour que Tailwind analyse ce fichier.
      "./src/**/*.{js,ts,jsx,tsx}", // Analyse tous les fichiers JS/JSX/TS/TX à l'intérieur de src
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  