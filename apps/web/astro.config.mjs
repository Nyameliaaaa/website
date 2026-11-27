// @ts-check

import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import astroExpressiveCode from 'astro-expressive-code';
import { COLOR_VALUES } from '@website/lib';

// https://astro.build/config
export default defineConfig({
	site: 'https://nyamelia.is-immensely.gay',
	integrations: [
		icon(),
		vue(),
		astroExpressiveCode({
			themes: ['catppuccin-macchiato', 'catppuccin-latte'],
			frames: {
				showCopyToClipboardButton: true, // already true by default
				removeCommentsWhenCopyingTerminalFrames: true, // strips # comments from terminal copy
			},
			styleOverrides: {
				frames: {
					editorActiveTabBorderColor: '#f5bde6',
					editorActiveTabForeground: '#f5bde6',

					tooltipSuccessBackground: '#a6da95',
					tooltipSuccessForeground: '#181926',
				},
			},
		}),
		mdx(),
	],

	markdown: {
		shikiConfig: {
			theme: 'catppuccin-macchiato',
		},
	},

	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: true,
		},
	},
});
