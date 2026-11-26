import { env } from 'cloudflare:workers';

interface CachedFetchOptions {
	key: string;
	url: string;
	ttl: number;
	kv?: KVNamespace;
	ctx?: ExecutionContext;
}

export const cachedFetch = async ({ key, url, ttl, ctx, ...options }: CachedFetchOptions) => {
	const kv = options.kv ?? env.REQUEST_CACHE;
	const cached = await kv.get(key);

	if (cached) {
		return JSON.parse(cached);
	}

	const res = await fetch(url, {
		headers: { 'User-Agent': 'nyamelia-website/1.0 (nyameliaaaa@proton.me)' },
	});

	if (!res.ok) {
		throw new Error(`upstream fetch failed: ${res.status} ${res.statusText}`);
	}

	const data = await res.json();

	const writePromise = kv.put(key, JSON.stringify(data), {
		expirationTtl: Math.max(60, ttl),
	});

	if (ctx) {
		ctx.waitUntil(writePromise);
	} else {
		await writePromise;
	}

	return data;
};

export const cacheKey = async (prefix: string, ...parts: string[]) => {
	const text = parts.join(':');
	const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text));
	const hex = Array.from(new Uint8Array(hash))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');

	return `${prefix}:${hex}`;
};
