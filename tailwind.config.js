/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand accent
        accent: {
          DEFAULT: '#D9003E',
          hover: '#BF0036',
          active: '#A6002F',
          soft: 'rgba(217, 0, 62, 0.10)',
          softer: 'rgba(217, 0, 62, 0.06)',
        },
        // Semantic surfaces driven by CSS variables so light/dark transitions are smooth
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2) / <alpha-value>)',
        'ink-3': 'rgb(var(--ink-3) / <alpha-value>)',
        success: '#16A34A',
        'success-soft': 'rgba(22, 163, 74, 0.12)',
        warning: '#D97706',
        'warning-soft': 'rgba(217, 119, 6, 0.14)',
        danger: '#DC2626',
        'danger-soft': 'rgba(220, 38, 38, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 10, 15, 0.04), 0 1px 3px rgba(10, 10, 15, 0.06)',
        'card-hover': '0 4px 12px rgba(10, 10, 15, 0.08), 0 2px 4px rgba(10, 10, 15, 0.06)',
        glow: '0 8px 30px rgba(217, 0, 62, 0.28)',
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
    },
  },
  plugins: [],
}
