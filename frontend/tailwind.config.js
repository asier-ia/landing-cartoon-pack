/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1A1A',
        cream: '#F5F0E8',
        'retro-red': '#D94F4F',
        'retro-yellow': '#F0C040',
        'retro-blue': '#A8C8B0',
        'retro-mint': '#7A9A5A',
        'retro-pink': '#E8844A',
        'retro-purple': '#B88A5A',
        'retro-sky': '#C4D4B0',
        'retro-lavender': '#E8D8C0',
        'retro-terracotta': '#D4875A',
        'retro-brown': '#A67B5B',
        'retro-olive': '#7A9A5A',
        'retro-chili': '#B84A4A',
      },
      fontFamily: {
        heading: ['"Luckiest Guy"', 'cursive'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        retro: '4px 4px 0px 0px #1A1A1A',
        'retro-lg': '6px 6px 0px 0px #1A1A1A',
        'retro-xl': '8px 8px 0px 0px #1A1A1A',
      },
      borderRadius: {
        retro: '1.25rem',
      },
    },
  },
  plugins: [],
}
