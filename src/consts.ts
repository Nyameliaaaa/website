// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "amelia :3";
export const SITE_DESCRIPTION = "Welcome to my website!";

interface Pixelie {
	img: string;
	url?: string;
}

export const FOOTER_PIXELIES: Pixelie[] = [
	{
		url: "https://gayspace.fr",
		img: "https://gayspace.fr/images/buttons/button.gif",
	},
	{ url: "https://git.gay", img: "https://git.gay/assets/img/button.svg" },
	{ img: "https://maia.crimew.gay/badges/acab.gif" },
];

export const HEADER_URLS = [
	{ name: ":3", url: "/" },
	{ name: "ramblings", url: "/ramblings" },
	{ name: "manifesto", url: "/manifesto" },
	{ name: "uses", url: "/uses" },
];

export const AUTO_MARGIN = "mx-auto md:max-w-7xl px-2 md:px-0";
