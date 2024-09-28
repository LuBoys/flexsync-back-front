import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",  // Couleur de fond
        foreground: "#212121",  // Couleur du texte
        primary: "#9548e2",     // Couleur principale (boutons, etc.)
        secondary: "#8224e3",   // Couleur secondaire (design, accent)
      },
      // Si tu as des polices spécifiques, ajoute-les ici
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
        // Ajoute d'autres familles si nécessaire
      },
    },
  },
  plugins: [],
};

export default config;
