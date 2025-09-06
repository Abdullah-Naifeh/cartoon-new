/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: '#E2E8F0', // لون الحدود (رمادي فاتح)
        input: '#FFFFFF', // لون خلفية الحقول (أبيض)
        ring: '#FAA662', // لون الحلقة (أخضر)
        background: '#FFFFFF', // لون الخلفية (أبيض)
        foreground: '#000000', // لون النص (أسود)
        primary: {
          DEFAULT: '#F7AB21', // لون أخضر
          foreground: '#FFFFFF', // لون نص أبيض
        },
        secondary: {
          DEFAULT: '#FE6C04', // لون أخضر فاتح
          foreground: '#FFFFFF', // لون نص أبيض
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
