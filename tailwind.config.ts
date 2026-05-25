import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0B1F3A', dark: '#081629' },
        secondary: { DEFAULT: '#1D3D73', light: '#2A5298' },
        accent: { DEFAULT: '#C8A96B', light: '#D4B97B' },
        background: { DEFAULT: '#F8F9FB', alt: '#FFFFFF' },
        text: { DEFAULT: '#1E1E1E', muted: '#6B7280' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
