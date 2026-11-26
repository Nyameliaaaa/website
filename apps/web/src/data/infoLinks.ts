import type { LinkEntry } from '@lib/types';

export const pubKeyLinks: LinkEntry[] = [
	{ label: 'gpg', handle: 'txt', url: '/keys/pub.txt' },
	{ label: 'ssh', handle: 'txt', url: '/keys/ssh.txt' },
	{
		label: 'keyoxide',
		handle: '09F4E5FAF8AB59385117ABE0204D9FACA1132556',
		url: '"https://keyoxide.org/09F4E5FAF8AB59385117ABE0204D9FACA1132556',
	},
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
	{ label: 'twitter', handle: '@ameliascores', url: 'https://twitter.com/ameliascores' },
	{
		label: 'bluesky',
		handle: '@nyamelia.is-immensely.gay',
		url: 'https://bsky.app/profile/nyamelia.is-immensely.gay',
	},
	{ label: 'instagram', handle: '@Nyameliaaaa', url: 'https://instagram.com/Nyameliaaaa' },
	{ label: 'steam', handle: '@nyameliaaaa', url: 'https://steamcommunity.com/id/nyameliaaaa' },
	{ label: 'listenbrainz', handle: '@nyameliaaaa', url: 'https://listenbrainz.org/user/nyameliaaaa' },
	{ label: 'backloggd', handle: '@nyameliaaaa', url: 'https://backloggd.com/u/nyameliaaaa' },
];
