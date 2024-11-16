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
      keyframes: {
        fadein: {
          '0%': { bottom: '0', opacity: '0' },
          '100%': { bottom: '20px', opacity: '0.9' },
        },
      },
      animation: {
        fadein: 'fadein 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
};
