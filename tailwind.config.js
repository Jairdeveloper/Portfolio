module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a12',
        darkcard: '#131322',
        darkborder: '#23233a',
        lightgray: '#e5e7eb',
        accent: '#8b5cf6',
        accent2: '#6366f1',
        accentlight: '#a78bfa',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
