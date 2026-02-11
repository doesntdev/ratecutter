/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6FCA3A',     // Forward Payments green
          dark: '#17832d',        // Darker green for hover
          darker: '#1E2022',      // Near-black for text
          light: '#F5F5F5',       // Light gray background
        }
      }
    },
  },
  plugins: [],
}
