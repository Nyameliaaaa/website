// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    site: "https://amelia.is-immensely.gay",
    integrations: [mdx(), sitemap(), icon(), vue()],

    markdown: {
        shikiConfig: {
            theme: "catppuccin-macchiato",
        },
    },

    vite: {
        plugins: [tailwindcss()],
    },
});