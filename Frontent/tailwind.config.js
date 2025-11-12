/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Diz para ele olhar todos os arquivos .tsx e .jsx dentro de /src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}