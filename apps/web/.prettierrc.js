// @ts-check
import baseConfig from '@website/prettier-config';

/** @type {import("prettier").Config} */
const config = {
	...baseConfig,
	plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-astro'],
};

export default config;
