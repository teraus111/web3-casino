/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'casino': "url('/assets/image/main.jpg')",
        'mine': "url('/assets/image/mines.jpg')",
        'jackport': "url('/assets/image/roulette.jpg')",
        'crash': "url('/assets/image/crash.jpg')",
        'poker': "url('/assets/image/blackjack.jpg')",
      },
      colors:{
        dark:{
          900:"#030612",
          600:"#0e141d",
          500:"#141923"
        }
      }
      
    },

  },
  darkMode: "class",
  plugins: [heroui()],
}

