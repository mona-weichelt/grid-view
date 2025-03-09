import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(100vh)" },
          "100%": { transform: "translateY(0vh)" },
        },
        slideOut: {
          "0%": { transform: "translateY(0vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.16s ease-out",
        "slide-out": "slideOut 0.16s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
