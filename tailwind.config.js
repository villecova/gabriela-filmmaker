/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx,css}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      scrollBehavior: {
        smooth: 'smooth',
      },
      fontFamily: { 
        secondary: ['Inter', 'sans-serif'],
        main: ['Italiana', 'sans-serif']
      },
      colors: {
        primary: '#FAF1E8',
        secondary: '#777777',
        accent: '#E0B589',
        gray: '#F5F5F5'
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};
