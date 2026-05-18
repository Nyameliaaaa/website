export const RSS_TITLE = "amelia's ramblings :3";
export const RSS_DESCRIPTION =
	'i sometimes bark i mean think i mean bark and i think some people would like to hear that. i think (i dont)';

const isDev = false;
const prodUrl = 'https://services.nyamelia.workers.dev';
const devUrl = 'http://localhost:8787';
export const WORKERS_URL = isDev ? devUrl : prodUrl;