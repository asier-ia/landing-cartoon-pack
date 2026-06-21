/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1A1A',
        cream: '#F5F0E8',
        'retro-red': '#FF6B8A',
        'retro-yellow': '#F5D76E',
        'retro-blue': '#5B9BD5',
        'retro-mint': '#7EC8A4',
        'retro-pink': '#F4A2B3',
        'retro-purple': '#B088C8',
        'retro-sky': '#8ECAE6',
        'retro-lavender': '#C8B8E8',
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
