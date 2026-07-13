/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: 'var(--color-brand-dark)',       // Dark teal/green (primary background, footer)
          primary: 'var(--color-brand-primary)', // Logo teal, primary headings
          accent: 'var(--color-brand-primary)',  // Subheadings (legacy)
          gray: 'var(--color-brand-gray)',       // Logo gray, body text
          cardBg: 'var(--color-brand-card-bg)',  // Light minty card background
          faqBg: 'var(--color-brand-faq-bg)',    // Sage/light green accordion background
          green: 'var(--color-brand-green)',     // Speak to Advisor button green
          gold: 'var(--color-brand-gold)',       // Accent gold/beige
          grayText: 'var(--color-brand-gray-text)', // Navigation default, secondary elements
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        'xl': '40rem',   // 640px  (default is 36rem)
        '2xl': '48rem',  // 768px  (default is 42rem)
        '3xl': '56rem',  // 896px  (default is 48rem)
        '4xl': '64rem',  // 1024px (default is 56rem)
        '5xl': '72rem',  // 1152px (default is 64rem)
        '6xl': '80rem',  // 1280px (default is 72rem)
        '7xl': '90rem',  // 1440px (default is 80rem)
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
