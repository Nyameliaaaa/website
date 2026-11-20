import { RAMBLINGS_RSS_DESCRIPTION, RAMBLINGS_RSS_TITLE } from '@lib/consts';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { create } from 'xmlbuilder2';
import { readingTime } from '@lib/readingTime';

export async function GET(context: APIContext) {
	const ramblings = await getCollection('ramblings');

	const doc = create({ version: '1.0', encoding: 'utf-8' })
		// .ins('xml-stylesheet', 'type="text/xsl" href="/feed.xsl"')
		.ele('feed', { xmlns: 'http://www.w3.org/2005/Atom', 'xmlns:site': 'https://nyamelia.is-immensely.gay/ns' })
		.ele('title')
		.txt(RAMBLINGS_RSS_TITLE)
		.up()
		.ele('subtitle')
		.txt(RAMBLINGS_RSS_DESCRIPTION)
		.up()
		.ele('id')
		.txt('https://nyamelia.is-immensely.gay/')
		.up()
		.ele('updated')
		.txt(new Date().toISOString())
		.up()
		.ele('author')
		.ele('name')
		.txt('amelia cynthia winters')
		.up()
		.ele('uri')
		.txt('https://nyamelia.is-immensely.gay/')
		.up()
		.up()
		.ele('rights')
		.txt('CC BY-NC 4.0')
		.up()
		.ele('link', { rel: 'self', href: 'https://nyamelia.is-immensely.gay/feed.xml' })
		.up()
		.ele('generator')
		.txt(context.generator)
		.up();

	for (const rambling of ramblings) {
		if (rambling.data.draft) {
			continue;
		}

		const entry = doc
			.ele('entry')
			.ele('title')
			.txt(rambling.data.title)
			.up()
			.ele('id')
			.txt(`https://nyamelia.is-immensely.gay/ramblings/${rambling.id}/`)
			.up()
			.ele('published')
			.txt(rambling.data.pubDate.toISOString())
			.up()
			.ele('updated')
			.txt((rambling.data.updatedDate ?? rambling.data.pubDate).toISOString())
			.up()
			.ele('summary')
			.txt(rambling.data.description)
			.up()
			.ele('link', { rel: 'alternate', href: `https://nyamelia.is-immensely.gay/ramblings/${rambling.id}/` })
			.up()
			.ele('site:readingTime')
			.txt(readingTime(rambling.body ?? '').toString())
			.up();

		for (const tag of rambling.data.tags ?? []) {
			entry.ele('category', { term: tag }).up();
		}

		entry.up();
	}

	return new Response(doc.end(), {
		headers: { 'Content-Type': 'application/xml' },
	});
}
