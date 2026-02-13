/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Crimson Pro'", 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          600: '#002c5f',
          700: '#001f43',
        },
      },
    },
  },
  plugins: [],
}