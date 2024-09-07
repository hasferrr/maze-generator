/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wall: {
          "0%": {
            transform: "scale(0.3)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        path: {
          '0%': {
            backgroundColor: '#0f172a',
          },
          '100%': {
            backgroundColor: '#e2e8f0',
          },
        },
        visit: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "#6b46c1",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "#5b21b6",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "#3b82f6",
          },
          "90%": {
            transform: "scale(0.8)",
            backgroundColor: "#06b6d4",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "#22d3ee",
          },
        },
        result: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "#facc15",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "#fbbf24",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "#84cc16",
          },
          "90%": {
            transform: "scale(0.8)",
            backgroundColor: "#4ade80",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "#22c55e",
          },
        },
      },
      animation: {
        wall: "wall 0.5s",
        path: "path 0.5s",
        visit: "visit 0.5s",
        result: "result 0.5s",
      },
    },
  },
  plugins: [],
}
