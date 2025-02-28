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
        // tag colors
        'tag-gray': 'var(--tag-gray)',
        'tag-red': 'var(--tag-red)',
        'tag-blue': 'var(--tag-blue)',
        'tag-green': 'var(--tag-green)',
        'tag-yellow': 'var(--tag-yellow)',
        'tag-brown': 'var(--tag-brown)',
        'tag-orange': 'var(--tag-orange)',
        'tag-purple': 'var(--tag-purple)',
        'tag-pink': 'var(--tag-pink)',
        'tag-hover': 'var(--tag-hover)',

        // border color
        'border-color': 'var(--border-color)',

        // text colors
        'text-gray': 'var(--text-gray)',
        'text-red': 'var(--text-red)',
        'text-blue': 'var(--text-blue)',
        'text-green': 'var(--text-green)',
        'text-yellow': 'var(--text-yellow)',
        'text-brown': 'var(--text-brown)',
        'text-orange': 'var(--text-orange)',
        'text-purple': 'var(--text-purple)',
        'text-pink': 'var(--text-pink)',
        'text-default': 'var(--text-default)',
        'text-default-hover': 'var(--text-default-hover)',
        'text-title-default': 'var(--text-title-default)',

        // scroll bar color
        'scroll-bar': 'var(--scroll-bar)',

        // button colors
        'button-default': 'var(--button-default)',
        'button-default-hover': 'var(--button-default-hover)',

        // bookmark hover color
        'bookmark-hover': 'var(--bookmark-hover)',

        // code block color
        'tag-code-block': 'var(--tag-code-block)',
      },
    },
  },
  plugins: [],
} satisfies Config;
