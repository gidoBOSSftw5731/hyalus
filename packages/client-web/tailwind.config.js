const path = require("path");
const colors = require("tailwindcss/colors");
const swapper = require("tailwindcss-theme-swapper");

module.exports = {
  purge: [`${path.join(__dirname, "src")}/**/*.vue`],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          550: "#62626B",
          600: "#52525B",
          650: "#494951",
          700: "#3F3F46",
          750: "#333338",
          800: "#27272A",
          850: "#202023",
          900: "#18181B",
        },
      },
      minWidth: {
        "1/2": "50%",
      },
    },
    fontFamily: {
      sans: "Inter, sans-serif",
      mono: "Inconsolata, monospace",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/line-clamp"),
    swapper({
      themes: [
        {
          name: "base",
          selectors: [":root"],
          theme: {
            colors: {
              //default accent color goes here.
              primary: colors.emerald,
            },
          },
        },
        ...[
          //this will be a lot less janky once we move to @tailwindcss/jit.
          //we're currently waiting for it to be merged upstream.
          "red",
          "orange",
          "amber",
          "yellow",
          "lime",
          "green",
          "emerald",
          "teal",
          "cyan",
          "lightBlue",
          "blue",
          "indigo",
          "violet",
          "purple",
          "fuchsia",
          "pink",
          "rose",
        ].map((accent) => ({
          selectors: [`accent-${accent}`],
          theme: {
            colors: {
              primary: colors[accent],
            },
          },
        })),
      ],
    }),
  ],
};
