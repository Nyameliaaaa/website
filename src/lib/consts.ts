export const RSS_TITLE = "amelia's ramblings :3";
export const RSS_DESCRIPTION =
    'i sometimes bark i mean think i mean bark and i think some people would like to hear that. i think (i dont)';

const currentlyDev = true;
const isDev = import.meta.env.CF_PAGES_COMMIT_SHA ? false : currentlyDev;
const prodUrl = 'https://nyamelia-services.nyamelia.workers.dev/api';
const devUrl = 'http://localhost:8787/api';
export const WORKERS_URL = isDev ? devUrl : prodUrl;

export const CATPPUCCIN_MACCHIATO_COLORS = [
    'rosewater',
    'flamingo',
    'pink',
    'mauve',
    'red',
    'maroon',
    'peach',
    'yellow',
    'green',
    'teal',
    'sky',
    'sapphire',
    'blue',
    'lavender'
];
