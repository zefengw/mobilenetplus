module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          dark: '#2563EB', // blue-600
        },
        secondary: {
          DEFAULT: '#10B981', // emerald-500
          dark: '#059669', // emerald-600
        },
        border: 'hsl(var(--border))',
      },
      borderWidth: {
        '5': '5px',
      },
    },
  },
  plugins: [],
}

