import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        walnut: '#3B2418',
        espresso: '#211710',
        oak: '#C99A62',
        cream: '#F8F4EC',
        offwhite: '#FFFDF9',
        olive: '#6D7358',
        stone: '#F3EFEA',
        border: '#E8DED1'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(59, 36, 24, 0.12)'
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
