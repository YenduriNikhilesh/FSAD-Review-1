/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
        },
        slate: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      },
    },
  },
  plugins: [],
}
