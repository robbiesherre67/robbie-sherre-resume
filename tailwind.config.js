/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" }
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(59,130,246,0)" },
          "50%": { boxShadow: "0 8px 24px rgba(59,130,246,0.25)" }
        }
      },
      animation: {
        floaty: "floaty 3s ease-in-out infinite",
        glow: "glow 2.4s ease-in-out infinite"
      }
    }
  },
  plugins: [],
};
