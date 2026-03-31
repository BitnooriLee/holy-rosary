import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'jewel-glow': 'jewelGlow 1.8s ease-in-out infinite',
        'decade-sparkle': 'decadeSparkle 0.85s ease-out forwards',
        'bead-tap': 'beadTap 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)',
        'fade-in': 'fadeIn 0.5s ease',
      },
      keyframes: {
        jewelGlow: {
          '0%,100%': {
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 3px #fff8) drop-shadow(0 0 6px var(--glow-1))',
          },
          '40%': {
            transform: 'scale(1.18)',
            filter:
              'drop-shadow(0 0 6px #fff) drop-shadow(0 0 14px var(--glow-1)) drop-shadow(0 0 26px var(--glow-2))',
          },
          '70%': {
            transform: 'scale(1.12)',
            filter: 'drop-shadow(0 0 4px #fff8) drop-shadow(0 0 10px var(--glow-1))',
          },
        },
        decadeSparkle: {
          '0%': { transform: 'scale(1)', filter: 'none', opacity: '1' },
          '25%': {
            transform: 'scale(1.45)',
            filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 28px gold) brightness(2.2)',
            opacity: '1',
          },
          '75%': {
            transform: 'scale(1.1)',
            filter: 'drop-shadow(0 0 8px gold) brightness(1.4)',
            opacity: '1',
          },
          '100%': { transform: 'scale(1)', filter: 'none', opacity: '1' },
        },
        beadTap: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.35)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
