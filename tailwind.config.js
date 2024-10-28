
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "2rem", 
    },
  },
  plugins: [require("flowbite/plugin")],
};
