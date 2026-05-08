import type { Gallery, LinkSection, PixelieEntry } from '@lib/types';

export const headerLinks = [
    { name: ':3', url: '/' },
    { name: 'ramblings', url: '/ramblings' },
    { name: 'uses', url: '/uses' }
];

export const footerUrls = [
    { url: 'https://git.gay/nyamelia/website', text: 'view source', icon: 'git' },
    { url: '/rss.xml', text: 'rss feed', icon: 'rss' },
    { url: '/guestbook', text: 'guestbook', icon: 'pencil-box-multiple' },
    { url: '/message', text: 'message', icon: 'message' },
    { url: '/pixelies', text: 'the 88x31 museum', icon: 'link-box-variant' },
    { url: '/music', text: 'music', icon: 'music-box-multiple' }
];

export const footerPixelies: PixelieEntry[] = [
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
    { url: 'https://firefox.com', img: 'https://88x31.nl/gifs/firefox4.gif', alt: 'tested on firefox' },
    { img: 'https://88x31.nl/gifs/miku.gif', alt: 'this site is miku approved' }
];

export const homeLinks: LinkSection[] = [
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

export const pixelies = (generator: string): Gallery[] => {
    return [
        {
            name: 'gf <3',
            pixelies: [
                { url: 'https://gayspace.fr', img: 'https://gayspace.fr/images/buttons/button.gif', alt: 'lori <3' }
            ]
        },
        {
            name: 'friends',
            pixelies: [
                { url: 'https://hazelthats.me/', img: 'https://hazelthats.me/badges/hazelthatsme.gif', alt: 'hazel' }
            ]
        },
        {
            name: 'website inspo',
            pixelies: [
                {
                    url: 'https://sapphic.moe',
                    img: 'https://sapphic.moe/buttons/sapphic.png',
                    alt: 'sapphic angels'
                },
                {
                    url: 'https://maia.crimew.gay',
                    img: 'https://maia.crimew.gay/badges/maia.crimew.gay.png',
                    alt: 'maia arson crimew'
                }
            ]
        },
        {
            name: 'tools/software',
            pixelies: [
                {
                    url: 'https://astro.build',
                    img: 'https://sapphic.moe/buttons/other/astro.png',
                    alt: generator.replace(/^A/, 'a')
                },
                { url: 'https://bitwarden.com', img: 'https://88x31.nl/gifs/bitwarden.gif', alt: 'bitwarden' },
                { url: 'https://firefox.com', img: 'https://88x31.nl/gifs/firefox4.gif', alt: 'tested on firefox' },
                { url: 'https://qbittorrent.org', img: 'https://sapphic.moe/buttons/other/qbittorrent.png' }
            ]
        },
        {
            name: 'pride',
            pixelies: [
                { img: 'https://88x31.nl/gifs/autismacceptnow.jpg', alt: 'autism acceptance now' },
                { img: 'https://88x31.nl/gifs/girlsnow.png', alt: 'girls now' }
            ]
        },
        {
            name: 'beliefs',
            pixelies: [
                { img: 'https://88x31.nl/gifs/chrome.gif', alt: 'chrome to ie is just same shit different asshole' },
                {
                    url: 'https://archive.org/donate',
                    img: 'https://88x31.nl/gifs/internetarchive.gif',
                    alt: 'donate to the internet archive <3'
                },
                { img: 'https://88x31.nl/gifs/internetprivacy.gif', alt: 'internet privacy NOW' },
                { img: 'https://88x31.nl/gifs/letscrushcapitalism.png', alt: "let's crush capitalism" },
                { img: 'https://88x31.nl/gifs/f_ckfb.gif', alt: 'fuck facebook' },
                {
                    url: 'https://joinmastodon.org',
                    img: 'https://88x31.nl/gifs/mastodon_button_2.gif',
                    alt: 'join mastodon'
                },
                { img: 'https://88x31.nl/gifs/nft.gif', alt: 'nft? no fucking thanks' },
                { url: 'https://aboutfeeds.com', img: 'https://88x31.nl/gifs/rss-button.gif', alt: 'rss feed' },
                { img: 'https://88x31.nl/gifs/microsoft_stop.gif', alt: 'stop microsoft' },

                { img: 'https://cyber.dabamos.de/88x31/antinazi.gif', alt: 'no nazi, no fascism, no racism' }
            ]
        },
        {
            name: 'other',
            pixelies: [
                { img: 'https://88x31.nl/gifs/youre_telling_me.png', alt: "you're telling me a queer coded this" },
                { img: 'https://88x31.nl/gifs/miku.gif', alt: 'this site is miku approved' }
            ]
        }
    ];
};
