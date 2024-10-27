/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './dist/**/*.{html,vue,js}',

  ],
  theme: {
    extend: {},
  },

  // purge: false,
  plugins: [],
}

