import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

const maxSideBarWidth = "22rem";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        main: `${maxSideBarWidth} 1fr`,
        projects: "repeat(auto-fill,minmax(14rem,1fr))",
      },
      gridTemplateRows: {
        main: "auto 1fr auto",
      },
      colors: {
        cream: "#fffbf5",
        asphalt: "#191f2d",
        banana: "#ffd080",
        amethyst: "#4a20ac",
        ash: "#7b94ce",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    typography,
    plugin(({ addVariant }) => {
      addVariant(
        "prose-inline-code",
        '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))',
      );
    }),
  ],
} satisfies Config;
