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
        secondary: ['Montserrat', 'sans-serif'],
        main: ['Prata', 'serif'],
        hero: ['Prata', 'serif']
      },
      colors: {
        // Paleta elegante para bodas - atemporal y sofisticada
        'ivory': '#FAF8F5',        // Blanco crema cálido - About, Pricing
        'blush-bg': '#F5EBE4',     // Rosa/durazno muy suave - Gallery, FAQs
        'pearl': '#E8E6E1',        // Gris perla - Footer
        'taupe': '#4A4843',        // Gris antracita cálido - títulos
        'charcoal': '#3A3835',     // Gris carbón - dropdowns, elementos oscuros
        'dusty': '#D9B89A',        // Durazno rosado suave - botones principales
        'blush': '#E8C9B0',        // Durazno claro suave - acentos, hovers
        'mist': '#D4D8DC',         // Gris azulado suave - overlay hero
        // Colores legacy para compatibilidad
        primary: '#FAF8F5',
        secondary: '#4A4843',
        accent: '#D4C4B0',
        gray: '#F5F5F5'
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};
