import type { PixelieEntry, PixelieSection } from '@lib/types';

// https://gayspace.fr/images/buttons/button.gif

export const footerPixelies: PixelieEntry[] = [
	{ img: '/88x31/button.png', alt: 'nyamelia (me)' },
	{ img: '/88x31/lori_button.gif', alt: 'lori <3' },
];

export const pixelies = (generator: string): PixelieSection[] => {
	return [
		{
			name: 'gf <3',
			pixelies: [{ img: '/88x31/lori_button.gif', alt: 'lori <3' }],
		},
		{
			name: 'friends',
			pixelies: [
				{ url: 'https://hazelthats.me/', img: 'https://hazelthats.me/badges/hazelthatsme.gif', alt: 'hazel' },
				{
					url: 'https://mayaqq.dev',
					img: 'https://mayaqq.dev/assets/88x31/me.gif',
					alt: 'mayaqq (ty for the domain <3)',
				},
			],
		},
		{
			name: 'website inspo',
			pixelies: [
				{ url: 'https://sapphic.moe', img: 'https://sapphic.moe/buttons/sapphic.png', alt: 'sapphic angels' },
				{
					url: 'https://maia.crimew.gay',
					img: 'https://maia.crimew.gay/badges/maia.crimew.gay.png',
					alt: 'maia arson crimew',
				},
			],
		},
		{
			name: 'tools/software',
			pixelies: [
				{
					url: 'https://astro.build',
					img: 'https://sapphic.moe/buttons/other/astro.png',
					alt: generator.replace(/^A/, 'a'),
				},
				{ url: 'https://bitwarden.com', img: 'https://88x31.nl/gifs/bitwarden.gif', alt: 'bitwarden' },
				{ url: 'https://firefox.com', img: 'https://88x31.nl/gifs/firefox4.gif', alt: 'tested on firefox' },
				{
					url: 'https://qbittorrent.org',
					img: 'https://sapphic.moe/buttons/other/qbittorrent.png',
					alt: 'qbittorrent',
				},
			],
		},
		{
			name: 'pride',
			pixelies: [
				{ img: 'https://88x31.nl/gifs/autismacceptnow.jpg', alt: 'autism acceptance now' },
				{ img: 'https://88x31.nl/gifs/girlsnow.png', alt: 'girls now' },
			],
		},
		{
			name: 'beliefs',
			pixelies: [
				{ img: 'https://88x31.nl/gifs/chrome.gif', alt: 'chrome to ie is just same shit different asshole' },
				{
					url: 'https://archive.org/donate',
					img: 'https://88x31.nl/gifs/internetarchive.gif',
					alt: 'donate to the internet archive <3',
				},
				{ img: 'https://88x31.nl/gifs/internetprivacy.gif', alt: 'internet privacy NOW' },
				{ img: 'https://88x31.nl/gifs/letscrushcapitalism.png', alt: "let's crush capitalism" },
				{ img: 'https://88x31.nl/gifs/f_ckfb.gif', alt: 'fuck facebook' },
				{
					url: 'https://joinmastodon.org',
					img: 'https://88x31.nl/gifs/mastodon_button_2.gif',
					alt: 'join mastodon',
				},
				{ img: 'https://88x31.nl/gifs/nft.gif', alt: 'nft? no fucking thanks' },
				{ url: 'https://aboutfeeds.com', img: 'https://88x31.nl/gifs/rss-button.gif', alt: 'rss feed' },
				{ img: 'https://88x31.nl/gifs/microsoft_stop.gif', alt: 'stop microsoft' },

				{ img: 'https://cyber.dabamos.de/88x31/antinazi.gif', alt: 'no nazi, no fascism, no racism' },
			],
		},
		{
			name: 'other',
			pixelies: [
				{ img: 'https://88x31.nl/gifs/youre_telling_me.png', alt: "you're telling me a queer coded this" },
				{ img: 'https://88x31.nl/gifs/miku.gif', alt: 'this site is miku approved' },
			],
		},
	];
};
