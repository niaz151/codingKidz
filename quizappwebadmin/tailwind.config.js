module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ckorange: "#FF671D",
      ckyellow: "#FED500",
      ckblue: "#3FA6D3",
      ckgrey: "#646565",
      ckbeige: "#FFF8DE",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
