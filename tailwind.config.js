/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // xs default: 0.75rem (12px)
        'xs': ['0.875rem', { lineHeight: '1.25rem' }],
        // sm default: 0.875rem (14px)
        'sm': ['1rem', { lineHeight: '1.5rem' }],
        // base default: 1rem (16px)
        'base': ['1.125rem', { lineHeight: '1.75rem' }],
        // lg default: 1.125rem (18px)
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],
        // xl default: 1.25rem (20px)
        'xl': ['1.375rem', { lineHeight: '1.75rem' }],
        // 2xl default: 1.5rem (24px)
        '2xl': ['1.625rem', { lineHeight: '2rem' }],
        // 3xl default: 1.875rem (30px)
        '3xl': ['2rem', { lineHeight: '2.25rem' }],
        // 4xl default: 2.25rem (36px)
        '4xl': ['2.375rem', { lineHeight: '2.5rem' }],
        // 5xl default: 3rem (48px)
        '5xl': ['3.125rem', { lineHeight: '1' }],
      },
      colors: {
        gray: {
          400: '#333333',
          500: '#333333',
          600: '#333333',
          700: '#333333',
          800: '#333333',
          900: '#333333',
        },
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
        sans: ['BentonSans', 'Inter', 'sans-serif'],
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
