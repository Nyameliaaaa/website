import { getCollection } from 'astro:content';

export async function getTagList() {
	const ramblings = await getCollection('ramblings');

	return [
		{ label: '(all posts)', value: 'ramblings' },
		...[...new Set(ramblings.flatMap(p => p.data.tags ?? []))].map(tag => ({
			label: tag,
			value: `ramblings/tags/${tag}`,
		})),
	];
}
