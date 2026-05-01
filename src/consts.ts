export const RSS_TITLE = "amelia's ramblings :3";
export const RSS_DESCRIPTION =
    'i sometimes bark i mean think i mean bark and i think some people would like to hear that. i think (i dont)';

interface LinkSection {
    name: string;
    links: Array<{
        label: string;
        handle: string;
        url?: string;
    }>;
}

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

export const AUTO_MARGIN = 'mx-auto md:max-w-7xl px-2 md:px-0';
export const TOC_SIDEBAR_CLASSES = ['grid grid-cols-1 gap-2', 'lg:grid-cols-4 lg:divide-x-2 lg:divide-ctp-base'];
export const HEADER_ID = 'rambling-header';
