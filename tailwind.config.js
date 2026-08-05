/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hostdime: {
          navy: '#162a45',
          navyDark: '#0f1e33',
          slate: '#1c3d5a',
          orange: '#f37021',
          orangeHover: '#d95d13',
          teal: '#20c997',
          tealDark: '#12b886',
          cyan: '#209cee',
          lightBg: '#f5f7fa',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        display: ['Roboto', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'hostdime': '0 10px 30px rgba(22, 42, 69, 0.08)',
        'hostdime-hover': '0 15px 35px rgba(22, 42, 69, 0.14)',
        'card-overlap': '0 20px 40px -15px rgba(15, 30, 51, 0.25)',
      }
    },
  },
  plugins: [],
}
