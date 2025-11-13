/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // Indigo-500
        secondary: '#a5b4fc', // Indigo-300
        accent: '#f472b6', // Pink-400
        background: '#f9fafb', // Gray-50
        surface: '#ffffff', // White
        text: '#1e293b', // Gray-800
        textSecondary: '#4b5563', // Gray-600
        border: '#e5e7eb', // Gray-200
        success: '#16a34a', // Green-500
        warning: '#d97706', // Yellow-500
        error: '#dc2626', // Red-500
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
