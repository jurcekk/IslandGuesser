/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      boxShadow: {
        'custom-shadow': '0 0 20px 5px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
