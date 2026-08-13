import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Using oklch color space for better perceptual uniformity
        primary: {
          50: 'oklch(0.97 0.01 270)',
          100: 'oklch(0.94 0.02 270)',
          200: 'oklch(0.88 0.04 270)',
          300: 'oklch(0.78 0.08 270)',
          400: 'oklch(0.68 0.14 270)',
          500: 'oklch(0.58 0.20 270)',
          600: 'oklch(0.48 0.22 270)',
          700: 'oklch(0.40 0.20 270)',
          800: 'oklch(0.32 0.16 270)',
          900: 'oklch(0.24 0.12 270)',
          950: 'oklch(0.16 0.08 270)',
        },
        accent: {
          50: 'oklch(0.97 0.01 330)',
          100: 'oklch(0.94 0.03 330)',
          200: 'oklch(0.88 0.06 330)',
          300: 'oklch(0.78 0.12 330)',
          400: 'oklch(0.68 0.18 330)',
          500: 'oklch(0.58 0.24 330)',
          600: 'oklch(0.48 0.26 330)',
          700: 'oklch(0.40 0.24 330)',
          800: 'oklch(0.32 0.20 330)',
          900: 'oklch(0.24 0.16 330)',
          950: 'oklch(0.16 0.12 330)',
        },
        slate: {
          50: 'oklch(0.98 0.005 240)',
          100: 'oklch(0.96 0.008 240)',
          200: 'oklch(0.92 0.012 240)',
          300: 'oklch(0.84 0.016 240)',
          400: 'oklch(0.68 0.020 240)',
          500: 'oklch(0.52 0.024 240)',
          600: 'oklch(0.42 0.024 240)',
          700: 'oklch(0.34 0.020 240)',
          800: 'oklch(0.26 0.016 240)',
          900: 'oklch(0.20 0.012 240)',
          950: 'oklch(0.14 0.008 240)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config
