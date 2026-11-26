import type { LinkEntry, LinkWithComment } from '@typings/links';

export const reachMeLinks: LinkWithComment[] = [
	{
		label: 'mail',
		url: 'mailto:nyameliaaaa@proton.me',
		handle: 'nyameliaaaa@proton.me',
		comment: 'your email is automatically encrypted if your email service can automatically encrypt with proton.',
		linksTo: {
			proceeding: ' if not, see ',
			url: '#public-keys',
			label: 'public keys',
		},
	},
	{
		label: 'matrix',
		url: 'https://matrix.to/#/@nyameliaaaa:wetdeer.club',
		handle: '@nyameliaaaa:wetdeer.club',
	},
	{
		label: 'signal',
		url: 'https://signal.me/#eu/PEyeUlAAQRMJ2kYTCwDPexYYMs6DHWLILEOeRVipRMLc9_peu9dI0Y3cd3Ey2oxw',
		handle: '@nyamelia.64',
	},
	{
		label: 'discord',
		url: 'https://discord.com/users/348591272476540928',
		handle: '@nyameliaaaa',
		comment: 'discouraged',
	},
	{
		label: 'telegram',
		url: 'https://t.me/nyameliaaaa',
		handle: '@nyameliaaaa',
		comment: 'HEAVILY discouraged, do not use this unless you have exhausted all previous options',
	},
];

export const pubKeyLinks: LinkWithComment[] = [
	{
		label: 'gpg',
		comment: 'signing and encrypting emails, keyoxide, etc',
		url: '/keys/pub.txt',
	},
	{
		label: 'ssh',
		comment: 'signing commits, authenticating with forges, or connecting to a server',
		url: '/keys/ssh.txt',
	},
	{
		label: 'keyoxide',
		comment: 'verifying authenticity of my profiles using gpg',
		url: 'https://keyoxide.org/09F4E5FAF8AB59385117ABE0204D9FACA1132556',
	},
];

export const gitForgeLinks: LinkWithComment[] = [
	{
		label: 'git.gay',
		handle: '@nyamelia',
		url: 'https://git.gay/nyamelia',
		comment: 'primary git forge',
	},
	{
		label: 'github',
		handle: '@nyameliaaaa',
		url: 'https://github.com/nyameliaaaa',
		comment: 'used only as a mirror and for contributing to projects still on github',
		linksTo: {
			proceeding: ', ',
			label: "here's why",
			url: 'https://github.com/Nyameliaaaa/Nyameliaaaa/blob/main/README.md',
		},
	},
];

