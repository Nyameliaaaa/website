import type { LinkEntry, PixelieEntry, PixelieSection, Playlist } from '@lib/types';

export const headerLinks = [
	{ name: ':3', url: '/' },
	{ name: 'ramblings', url: '/ramblings' },
	{ name: 'uses', url: '/uses' },
];

export const footerUrls = [
	{ url: 'https://git.gay/nyamelia/website', text: 'view source', icon: 'git' },
	{ url: '/rss.xml', text: 'rss feed', icon: 'rss' },
	{ url: '/guestbook', text: 'guestbook', icon: 'pencil-box-multiple' },
	{ url: '/message', text: 'message', icon: 'message' },
	{ url: '/pixelies', text: 'the 88x31 museum', icon: 'link-box-variant' },
	{ url: '/music', text: 'music', icon: 'music-box-multiple' },
	{ url: '/about', text: 'about', icon: 'info' },
];

export const footerPixelies: PixelieEntry[] = [
	{ img: '/88x31/button.png', alt: 'nyamelia (me)' },
	{ url: 'https://gayspace.fr', img: 'https://gayspace.fr/images/buttons/button.gif', alt: 'gf lori <3' },
	// { url: 'https://firefox.com', img: 'https://88x31.nl/gifs/firefox4.gif', alt: 'tested on firefox' }
];

export const meLinks: LinkEntry[] = [
	{ label: 'pronouns.page', handle: '@nyamelia', url: 'https://en.pronouns.page/@Nyameliaaaa' },
	{ label: 'attraction layer cake', handle: 'rC6', url: 'https://cake.avris.it/rC6' },
	{ label: 'arvis.it spectrum', handle: 'F4Q2', url: 'https://spectrum.avris.it/F4Q2' },
];

export const sourceLinks: LinkEntry[] = [
	{ label: 'website', handle: 'nyamelia/website', url: 'https://git.gay/nyamelia/website/src/branch/main/apps/web' },
	{ label: 'helper', handle: 'nyamelia/website', url: 'https://git.gay/nyamelia/website/src/branch/main/apps/worker' },
];

export const contactLinks: LinkEntry[] = [
	{
		label: 'mastodon',
		handle: '@nyameliaaaa@tech.lgbt',
		url: 'https://tech.lgbt/@nyameliaaaa',
	},
	{ label: 'twitter', handle: '@Nyameliaaaa', url: 'https://twitter.com/Nyameliaaaa' },
	{
		label: 'bluesky',
		handle: '@nyamelia.is-immensely.gay',
		url: 'https://bsky.app/profile/nyamelia.is-immensely.gay',
	},
	{ label: 'instagram', handle: '@Nyameliaaaa', url: 'https://instagram.com/Nyameliaaaa' },
	{ label: 'steam', handle: '@nyameliaaaa', url: 'https://steamcommunity.com/id/nyameliaaaa/' },
	{ label: 'last.fm', handle: '@nyamelia', url: 'https://last.fm/user/nyamelia' },
	{ label: 'backloggd', handle: '@nyameliaaaa', url: 'https://backloggd.com/u/nyameliaaaa/' },
];

export const playlists: Playlist[] = [
	{
		name: 'audible gabe',
		content: 'game OSTs',
		image: '/playlist-covers/audible-gabe.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRuD0f0mJk-5JmZv11vRl4aV',
	},
	{
		name: 'there is estrogen in my headphones',
		content: 'hyperpop',
		image: '/playlist-covers/estrogen.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRsA2JV5zAs7VxUc1MfcGoU6',
	},
	{
		name: 'god is dead and i killed him',
		content: 'heavy metal & friends',
		image: '/playlist-covers/god-is-dead.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRvM1vpVWFq6wIbS7dnijIeh',
	},
	{
		name: 'it was a good day (it was not)',
		content: 'rap',
		image: '/playlist-covers/good-day.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRusVfOLoQ3LVNVUZpTZWmIt',
	},
	{
		name: 'mediocre apple',
		content: 'vocaloid, utaite, jpop & touhou',
		image: '/playlist-covers/mediocre-apple.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRv2fTwCQNh6QPIa4NcOROMG',
	},
	{
		name: 'its not a phase mom',
		content: 'emo, alt rock, grunge & pop punk',
		image: '/playlist-covers/phase.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRsRUoal2lP6feuZoT5x1JOf',
	},
	{
		name: 'songs to totally definitely use as a shock collar pattern',
		content: 'mc, ncs & gd music (affectionate)',
		image: '/playlist-covers/shock-collar.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRuYMq_oq3GR7qkjYHdcx434',
	},
	{
		name: "taylor swift's sleep paralysis demons",
		content: "pop that isn't corporate but not hyper enough for hyperpop",
		image: '/playlist-covers/taylor-swift.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRsMUOs9cc3MwXRwskNqLMUG',
	},
	{
		name: 'i have been kidnapped by drunk uzbek space wizards',
		content: 'folk & power metal',
		image: '/playlist-covers/uzbek-space-wizard.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRthbn6YmUznpFHQ3HN2IQfq',
	},
	{
		name: 'yearning :3',
		content: 'lesbian',
		image: '/playlist-covers/yearning.jpg',
		url: 'https://music.youtube.com/playlist?list=PLLkb4ldSNGRspMHSIA0ZpQB7PaONW7yri',
	},
]

export const pixelies = (generator: string): PixelieSection[] => {
	return [
		{
			name: 'gf <3',
			pixelies: [{ url: 'https://gayspace.fr', img: 'https://gayspace.fr/images/buttons/button.gif', alt: 'lori <3' }],
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
