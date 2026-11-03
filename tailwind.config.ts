import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paradise: {
          // Royal Maroon / Burgundy Palette
          maroon: {
            50: '#FDF2F4',
            100: '#FCE7EA',
            200: '#F7C4CA',
            300: '#EE96A2',
            400: '#DF5E71',
            500: '#C92F47',
            600: '#9B1D30',
            700: '#7A1424',
            800: '#58111A', // Brand Deep Maroon
            900: '#4A0E17', // Brand Signature Burgundy
            950: '#2A060B', // Midnight Royal Maroon
          },
          // Warm Metallic Royal Gold Palette
          gold: {
            50: '#FCF9EE',
            100: '#F7F0D4',
            200: '#EFE1A7',
            300: '#E4CD73',
            400: '#DAB847',
            500: '#D4AF37', // Brand Classic Metallic Gold
            600: '#C5A059', // Brand Warm Antique Gold
            700: '#9A7936',
            800: '#7B602F',
            900: '#674F29',
            950: '#3C2C13',
          },
          // Cream / Off-White Heritage Canvas
          cream: {
            50: '#FFFFFF',
            100: '#FDFBF7', // Brand Primary Canvas
            200: '#F9F5EC',
            300: '#F1E9D7',
            400: '#E5D8BC',
            500: '#D6C39F',
          },
          // Charcoal / Dark Neutral Palette
          charcoal: {
            50: '#F6F6F6',
            100: '#E7E7E7',
            200: '#D1D1D1',
            300: '#B0B0B0',
            400: '#888888',
            500: '#6D6D6D',
            600: '#575757',
            700: '#3F3F3F',
            800: '#2A2A2A',
            900: '#1F1F1F', // Brand Dark Neutral
            950: '#121212',
          },
          // Accent Badges
          veg: '#0F8A43',
          nonVeg: '#B91C1C',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-outfit)', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
      backgroundImage: {
        'royal-gradient':
          'linear-gradient(135deg, #4A0E17 0%, #58111A 50%, #2A060B 100%)',
        'gold-shimmer':
          'linear-gradient(90deg, #C5A059 0%, #F7F0D4 50%, #C5A059 100%)',
        'gold-gradient':
          'linear-gradient(135deg, #D4AF37 0%, #C5A059 50%, #9A7936 100%)',
        'card-pattern':
          'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)',
      },
      boxShadow: {
        'royal-sm': '0 2px 8px -1px rgba(74, 14, 23, 0.12)',
        'royal-md': '0 8px 24px -4px rgba(74, 14, 23, 0.18)',
        'royal-lg': '0 16px 36px -6px rgba(74, 14, 23, 0.28)',
        'gold-glow': '0 0 20px -2px rgba(212, 175, 55, 0.35)',
        'gold-glow-lg': '0 0 35px 2px rgba(212, 175, 55, 0.45)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
