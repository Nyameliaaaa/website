export const SITE_TITLE = 'amelia :3';
export const RAMBLING_DESCRIPTION =
    'i sometimes bark i mean think i mean bark and i think some people would like to hear that. i think (i dont)';

export interface PixelieEntry {
    img: string;
    url?: string;
    alt?: string;
}

interface LinkSection {
    name: string;
    links: Array<{
        label: string;
        handle: string;
        url?: string;
    }>;
}

export const FOOTER_PIXELIES: PixelieEntry[] = [
    {
        url: 'https://gayspace.fr',
        img: 'https://gayspace.fr/images/buttons/button.gif',
        alt: 'lori <3'
    },
    {
        url: 'https://git.gay',
        img: 'https://git.gay/assets/img/button.svg',
        alt: 'git.gay'
    },
    { img: 'https://maia.crimew.gay/badges/acab.gif', alt: 'ACAB' }
];

export const HOME_LINKS: LinkSection[] = [
    {
        name: 'cool places',
        links: [
            {
                label: 'mastodon',
                handle: '@nyameliaaaa@tech.lgbt',
                url: 'https://tech.lgbt/@nyameliaaaa'
            },
            {
                label: 'git.gay',
                handle: '@nyamelia',
                url: 'https://git.gay/nyamelia'
            },
            {
                label: 'matrix',
                handle: '@nyameliaaaa:matrix.org',
                url: 'https://matrix.to/#/@nyameliaaaa:matrix.org'
            },
            {
                label: 'mail',
                handle: 'nyameliaaaa (AT) proton (DOT) me'
            }
        ]
    },
    {
        name: 'fiefdoms of palantir',
        links: [{ label: 'twitter', handle: '@Nyameliaaaa', url: 'https://twitter.com/Nyameliaaaa' }]
    }
];

export const HEADER_URLS = [
    { name: ':3', url: '/' },
    { name: 'ramblings', url: '/ramblings' },
    { name: 'music taste lol', url: '/music' },
    { name: 'uses', url: '/uses' }
];

export const FOOTER_URLS = [
    { url: 'https://git.gay/nyamelia/website', text: 'view source', icon: 'git' },
    { url: '/rss.xml', text: 'rss feed', icon: 'rss' },
    { url: '/guestbook', text: 'guestbook', icon: 'pencil-box-multiple' },
    { url: '/pixelies', text: 'the 88x31 museum', icon: 'link-box-variant' }
];

export const AUTO_MARGIN = 'mx-auto md:max-w-7xl px-2 md:px-0';
export const RAMBLING_SIDEBAR_TOC = ['grid grid-cols-1 gap-2', 'lg:grid-cols-4 lg:divide-x-2 lg:divide-ctp-base'];
export const HEADER_ID = 'rambling-header';
