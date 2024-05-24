/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1300px',
      xxl: '1440px',
    },
    extend: {
      colors: {
        main: '#bc6c25',
        minor: '#dda15e',
        navbgMain: '#ffffff',
        footerbgMain: '#14100f',
        mainSecond: '#001d3d',
        minorSecond: '#003566',
        centralMain: '#fefae0',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  plugins: [],
};
