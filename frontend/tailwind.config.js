/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      colors: {
        background: "#0D1117",
        surface: "#161B22",
        border: "#30363d",
        "text-default": "#e6edf3",
        "text-secondary": "#8b949e",
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // Accent Green
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16"
        },
        danger: {
          DEFAULT: "#f85149",
          text: "#f85149",
          surface: "rgba(248, 81, 73, 0.15)" // For backgrounds like in delete modal
        }
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-up": "slide-up 0.3s ease-in-out"
      }
    }
  },
  plugins: []
};
