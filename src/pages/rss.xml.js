import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
	const ramblings = await getCollection("ramblings");
	return rss({
		title: "amelia's ramblings :3",
		description:
			"i sometimes bark i mean think i mean bark and i think some people would like to hear that. i think (i dont)",
		site: context.site,
		items: ramblings.map((rambling) => ({
			...rambling.data,
			link: `/ramblings/${rambling.id}/`,
		})),
	});
}
