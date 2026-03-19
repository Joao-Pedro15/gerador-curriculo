/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1F3864',
          blue: '#4472C4',
          teal: '#4CAAAA',
        },
      },
    },
  },
  plugins: [],
};
