import { TTL } from '@/lib/consts';
import { cachedFetch, cacheKey } from '@/lib/requests';

export const getReleaseCoverUrl = (params: {
	caaReleaseMbid?: string;
	releaseMbid?: string;
	releaseGroupMbid?: string;
}) => {
	const possibleURLs: string[] = [];

	if (params.caaReleaseMbid) {
		possibleURLs.push(`https://coverartarchive.org/release/${params.caaReleaseMbid}/front-500`);
	}

	if (params.releaseMbid) {
		possibleURLs.push(`https://coverartarchive.org/release/${params.releaseMbid}/front-500`);
	}

	if (params.releaseGroupMbid) {
		possibleURLs.push(`https://coverartarchive.org/release-group/${params.releaseGroupMbid}/front-500`);
	}

	if (possibleURLs.length) {
		return possibleURLs;
	}

	return ['data:,']; // forces the alt text to show
};

export const getArtistImage = async (name: string, key: string): Promise<string> => {
	try {
		const res = await cachedFetch({
			key: await cacheKey(key, name),
			url: `https://api.deezer.com/search/artist?q=${encodeURIComponent(name)}&limit=1`,
			ttl: TTL.DEEZER_ARTIST_AVATAR,
		});

		return res.data?.[0]?.picture_big ?? res.data?.[0]?.picture_medium ?? 'data:,';
	} catch {
		return 'data:,';
	}
};
