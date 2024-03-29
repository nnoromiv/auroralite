import type { Config } from "tailwindcss";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "whiteRabbit": " #f7ede8",
        "grey": " #353535",
        "text-grey": " #808080",
        "bulb-grey": '#353535'
      },
      screens: {
        'lt': '1025px',
        'tb': '769px',
        'pn': '469px',
        'sm-pn': '376px',
        'xs-pn': '321px'
      },
    },
  },
  plugins: [
    require('daisyui'),
    addVariablesForColors, 
  ],
  daisyui: {
    themes: ["light", "dark",],
  },
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
export default config;
