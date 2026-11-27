import { LISTENBRAINZ_BASE, LISTENBRAINZ_USER, TTL } from '@/lib/consts';
import { getArtistImage, getReleaseCoverUrl } from '@/lib/music';
import { cachedFetch } from '@/lib/requests';
import type {
	GETMusicTopAlbums,
	GETMusicTopArtists,
	GETMusicRecentSongs,
	MusicAlbum,
	MusicArtist,
	MusicRecentSong,
} from '@website/lib';
import { Hono } from 'hono';

const music = new Hono<{ Bindings: Cloudflare.Env }>();

music.get('/recent-songs', async c => {
	const data = await cachedFetch({
		key: 'listenbrainz:listens:5',
		url: `${LISTENBRAINZ_BASE}/1/user/${LISTENBRAINZ_USER}/listens?count=5`,
		ttl: TTL.LISTENBRAINZ_RECENT_SONGS,
	});

	const clean: GETMusicRecentSongs = {
		data: await Promise.all(
			data.payload.listens.map(
				async (track: any) =>
					({
						name: track.track_metadata.track_name,
						artist: track.track_metadata.artist_name,
						album: track.track_metadata.release_name,
						images: getReleaseCoverUrl({
							caaReleaseMbid: track.track_metadata.mbid_mapping?.caa_release_mbid ?? null,
							releaseGroupMbid: track.track_metadata.mbid_mapping?.release_group_mbid ?? null,
							releaseMbid: track.track_metadata.mbid_mapping?.release_mbid ?? null,
						}),
						url: `https://musicbrainz.org/recording/${track.track_metadata.mbid_mapping?.recording_mbid}`,
					}) satisfies MusicRecentSong
			)
		),
	};

	return c.json(clean);
});

music.get('/top-artists', async c => {
	const data = await cachedFetch({
		key: 'listenbrainz:artists:10',
		url: `${LISTENBRAINZ_BASE}/1/stats/user/${LISTENBRAINZ_USER}/artists?range=week&count=10`,
		ttl: TTL.LISTENBRAINZ_TOP_ARTISTS,
	});

	const clean: GETMusicTopArtists = {
		data: await Promise.all(
			data.payload.artists.map(
				async (artist: any) =>
					({
						name: artist.artist_name,
						url: artist.artist_mbid
							? `https://musicbrainz.org/artist/${artist.artist_mbid}`
							: `https://musicbrainz.org/search?query=${encodeURIComponent(artist.artist_name)}&type=artist`,
						playcount: artist.listen_count,
						image: await getArtistImage(artist.artist_name, 'deezer:artist'),
					}) satisfies MusicArtist
			)
		),
	};

	return c.json(clean);
});

music.get('/top-albums', async c => {
	const data = await cachedFetch({
		key: 'listenbrainz:albums:15',
		url: `${LISTENBRAINZ_BASE}/1/stats/user/${LISTENBRAINZ_USER}/releases?range=month&count=15`,
		ttl: TTL.LISTENBRAINZ_TOP_ALBUMS,
	});

	const clean: GETMusicTopAlbums = {
		data: await Promise.all(
			data.payload.releases.map(
				async (album: any) =>
					({
						name: album.release_name,
						artist: album.artist_name,
						playcount: album.listen_count,
						images: getReleaseCoverUrl({
							caaReleaseMbid: album.caa_release_mbid ?? null,
							releaseMbid: album.release_mbid ?? null,
						}),
						url: album.release_mbid
							? `https://musicbrainz.org/release/${album.release_mbid}`
							: `https://musicbrainz.org/search?query=${encodeURIComponent(`${album.artist_name} ${album.release_name}`)}&type=release`,
					}) satisfies MusicAlbum
			)
		),
	};

	return c.json(clean);
});

export default music;
