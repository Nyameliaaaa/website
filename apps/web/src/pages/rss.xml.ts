import { RAMBLINGS_RSS_DESCRIPTION, RAMBLINGS_RSS_TITLE } from '@lib/consts';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
	const ramblings = await getCollection('ramblings');

	return rss({
		title: RAMBLINGS_RSS_TITLE,
		description: RAMBLINGS_RSS_DESCRIPTION,
		site: context.site ?? 'https://nyamelia.is-immensely.gay/',

		items: ramblings.map(rambling => ({
			title: rambling.data.title,
			description: rambling.data.description,
			pubDate: rambling.data.pubDate,
			link: `/ramblings/${rambling.id}/`,
			categories: rambling.data.tags,
		})),
		stylesheet: '/feed.xsl',
	});
}
