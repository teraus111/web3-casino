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
        'board': "url('/assets/image/bg/bg_board.png')",
        'navbar': "url('/assets/image/bg/bg_navbar.png')",
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

