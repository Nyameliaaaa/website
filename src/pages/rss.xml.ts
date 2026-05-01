import { getCollection, type CollectionEntry } from 'astro:content';
import rss from '@astrojs/rss';
import { RAMBLING_DESCRIPTION } from '../consts';
import type { APIContext } from 'astro';
// import { type RSSFeedItem } from '@astrojs/rss';
// import MarkdownIt from 'markdown-it';
// import sanitizeHtml from 'sanitize-html';

export async function GET(context: APIContext) {
    const ramblings = await getCollection('ramblings');


    return rss({
        title: "amelia's ramblings :3",
        description: RAMBLING_DESCRIPTION,
        site: context.site ?? 'https://nyamelia.is-immensely.gay/',

        items: ramblings.map(rambling => ({
            title: rambling.data.title,
            description: rambling.data.description,
            pubDate: rambling.data.pubDate,
            link: `/ramblings/${rambling.id}/`,
            categories: rambling.data.tags
        }))
    });
}
