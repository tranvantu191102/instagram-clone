/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Blinker: ['Blinker', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif']
      },
      backgroundImage: {
        'logo': "url('/src/assets/images/logo.png')"
      },
      colors: {
        'primary-bg': "var(--primary-bg)",
        'second-bg': "var(--second-bg)",
        'gray-bg': "var(--gray-color)",
        'gray-text': "var(--gray-text)",
        'black': "var(--black-color)",
        'primary-text': "var(--primary-text)",
        'blue-text': "var(--blue-text)",
        'white-text': "var(--white-text)",
        'border-color': "var(--border-color)",
        'red-color': "var(--red-color)",
      },
      fontSize: {
        sm: '12px',
        base: '14px',
        lg: '16px',
        '2lg': '20px',
        xl: '22px',
        '2xl': '28px'
      },
      boxShadow: {
        primary: '0 0 8px 1px #EFEFEF;'
      },
      height: {
        header: "var(--height-header)",
      },
      screens: {
        tab: { 'max': '970px' },
        mob: { 'max': '800px' }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
