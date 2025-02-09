import flowbite from "flowbite-react/tailwind";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: "#e7f7e7",
          100: "#9dde9d",
          200: "#85d685",
          300: "#54c654",
          400: "#3bbd3b",
          500: "#0aad0a",
          600: "#099c09",
          700: "#088a08",
          800: "#077907",
          900: "#055705",
          950: "#044504",
        },
      },
      screens: {
        "2xl": "1280px",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        bounce: "bounce 1s infinite",
        "scale-up": "scaleUp 0.3s ease-out",
      },
      fontFamily:{
        cairo:"Cairo Variable"
      }
    },
  },
  plugins: [flowbite.plugin()],
};
