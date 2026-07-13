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
          dark: 'var(--color-brand-dark, #002e2e)',       // Dark teal/green (primary background, footer)
          primary: 'var(--color-brand-primary, #005b5c)', // Logo teal, primary headings
          accent: 'var(--color-brand-primary, #005b5c)',  // Subheadings (legacy)
          gray: 'var(--color-brand-gray, #818286)',       // Logo gray, body text
          cardBg: 'var(--color-brand-card-bg, #e1efef)',  // Light minty card background
          faqBg: 'var(--color-brand-faq-bg, #e8f4e8)',    // Sage/light green accordion background
          green: 'var(--color-brand-green, #b0de96)',     // Speak to Advisor button green
          gold: 'var(--color-brand-gold, #c5a880)',       // Accent gold/beige
          grayText: 'var(--color-brand-gray-text, #96a8a8)', // Navigation default, secondary elements
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
