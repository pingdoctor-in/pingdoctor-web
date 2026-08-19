/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          bg: "#141414",
          card: "#1f1f1f",
          hover: "#2a2a2a",
          red: "#E50914",
          redHover: "#B81D24",
          cyan: "#00D2D3",
          teal: "#0ABDE3",
        }
      },
      aspectRatio: {
        '9/16': '9 / 16',
        '16/9': '16 / 9',
      },
      boxShadow: {
        'netflix': '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
        'cyan-glow': '0 0 20px rgba(0, 210, 211, 0.4)',
      }
    },
  },
  plugins: [],
}
