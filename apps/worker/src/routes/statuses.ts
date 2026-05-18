import { createDb, schema } from '@/db';
import { GETStatus } from '@website/lib';
import { env } from 'cloudflare:workers';
import { desc } from 'drizzle-orm';
import { Hono } from 'hono';

const statuses = new Hono<{ Bindings: Bindings }>();
const db = createDb(env.NYAMELIA_SERVICES);
const statusesDb = schema.statuses;

statuses.get('/', async c => {
	const entries = await db.select().from(statusesDb).orderBy(desc(statusesDb.createdAt));
	const result: GETStatus[] = entries.map(e => ({
		...e,
		createdAt: e.createdAt.toISOString(),
	}));

	return c.json(result, 200, { 'Cache-Control': 'public, max-age=120' });
});

statuses.get('/latest', async c => {
	const [entry] = await db.select().from(statusesDb).orderBy(desc(statusesDb.createdAt)).limit(1);
	const result: GETStatus = {
		...entry,
		createdAt: entry.createdAt.toISOString(),
	};

	return c.json(result, 200, { 'Cache-Control': 'public, max-age=120' });
});


export default statuses;
