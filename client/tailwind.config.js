/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPrimary: '#bc6c25',        // Renamed Primary Color
        brandSecondary: '#fefae0',       // Renamed Secondary Color
        brandAccent: '#dda15e',           // Renamed Accent Color
        brandHighlight: '#f2c29c',        // New Primary Color
        brandHighlightContrast: '#5edd7c', // Contrast color for brandHighlight
        brandNewHighlight: '#dd7c5e',     // New Highlight Color
        brandNewHighlightContrast: '#ffffff', // Contrast color for brandNewHighlight
        // Add more custom colors as needed
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
