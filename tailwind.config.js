/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        text: 'var(--text)',
      },
      fontFamily: {
        sans: ['var(--font-primary)', 'sans-serif'],
        heading: ['var(--font-heading)', 'serif'],
      },
    },
  },
  plugins: [],
}