export function readingTime(body: string) {
	const words = body.trim().split(/\s+/).length;
	return Math.ceil(words / 200);
}
