// @ts-check

import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://nyamelia.is-immensely.gay',
    integrations: [mdx(), sitemap(), icon(), vue()],

    markdown: {
        shikiConfig: {
            theme: 'catppuccin-macchiato'
        }
    },

    vite: {
        plugins: [tailwindcss()]
    },

    output: 'static',
    adapter: cloudflare()
});
