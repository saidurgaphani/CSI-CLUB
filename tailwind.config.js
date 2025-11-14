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
        background: '#e5e7eb', // Gray-200
        surface: '#ffffff', // White
        text: '#1e293b', // Gray-800
        textSecondary: '#4b5563', // Gray-600
        border: '#d1d5db', // Gray-300
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
      keyframes: {
        "pulse-slow": {
            '0%, 100%': {
                transform: 'translateX(-100%)',
            },
            '50%': {
                transform: 'translateX(100%)',
            },
        },
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
