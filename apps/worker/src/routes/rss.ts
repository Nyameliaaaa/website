import { createDb } from '@/db';
import { statuses } from '@website/schema';
import { desc } from 'drizzle-orm';
import { Hono } from 'hono';
import { env } from 'cloudflare:workers';
import { STATUSES_RSS_DESCRIPTION, STATUSES_RSS_TITLE } from '@website/lib';

const rss = new Hono<{ Bindings: Bindings }>();
const db = createDb(env.NYAMELIA_SERVICES);

rss.get('/statuses.xml', async c => {
	const entries = await db.select().from(statuses).orderBy(desc(statuses.createdAt));
	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0">',
		'	<channel>',
		`		<title>${STATUSES_RSS_TITLE}</title>`,
		'		<link>https://nyamelia.is-immensely.gay/statuses</link>',
		`		<description>${STATUSES_RSS_DESCRIPTION} these are NOT my ramblings lmao</description>`,
	];

	for (const entry of entries) {
		xml.push(
			...[
				'		<item>',
				`			<title>${entry.text}</title>`,
				`			<pubDate>${entry.createdAt.toUTCString()}</pubDate>`,
				`			<guid isPermaLink="false">${entry.id}</guid>`,
				'		</item>',
			]
		);
	}

	xml.push(...['	</channel>', '</rss>']);

	return c.body(xml.join('\n'), 200, { 'Content-Type': 'application/xml; charset=UTF-8' });
});

export default rss;
