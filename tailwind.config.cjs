/** @type {import("tailwindcss").Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const maxSideBarWidth = "22rem";

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        "main": `${maxSideBarWidth} 1fr`,
        "projects": "repeat(auto-fill,minmax(14rem,1fr))"
      },
      gridTemplateRows: {
        "main": "auto 1fr auto",
      },
      colors: {
        "cream": "#fffbf5",
        "asphalt": "#191f2d",
        "banana": "#ffd080",
        "amethyst": "#4a20ac",
        "ash": "#7b94ce"
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // https://aaronfrancis.com/2023/tailwind-typography-inline-code-only
    plugin(function ({addVariant}) {
      addVariant( 
        'prose-inline-code',
        '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))'
      );
    })
  ],
}
