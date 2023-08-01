/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        c1: "#",
        c2: "#",
        c3: "#",
        c4: "#",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      fontFamily: {
        montserrat: "montserrat,sans,serif",
      },
    },
    screens: {
      maxsm: { max: "767px" },
      maxlg: { max: "1279px" },
      xs: "360px",
      sm: "412px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [],
};
