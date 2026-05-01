import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { RAMBLING_DESCRIPTION } from '../consts';

export async function GET(context) {
	const ramblings = await getCollection("ramblings");
	return rss({
		title: "amelia's ramblings :3",
		description: RAMBLING_DESCRIPTION,
		site: context.site,
		items: ramblings.map((rambling) => ({
			...rambling.data,
			link: `/ramblings/${rambling.id}/`,
		})),
	});
}
