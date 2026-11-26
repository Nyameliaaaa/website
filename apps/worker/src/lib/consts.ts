export const LISTENBRAINZ_BASE = 'https://api.listenbrainz.org';
export const LISTENBRAINZ_USER = 'nyameliaaaa';

export const TTL = {
	MUSICBRAINZ_MBID: 7 * 24 * 60 * 60, // 1 week
	DEEZER_ARTIST_AVATAR: 7 * 24 * 60 * 60, // 1 week
	LISTENBRAINZ_RECENT_SONGS: 5 * 60, // 5 minutes
	LISTENBRAINZ_TOP_ARTISTS: 30 * 60, // 30 minutes
	LISTENBRAINZ_TOP_ALBUMS: 24 * 60 * 60, // 1 day
};

export const NEW_GUESTBOOK_ENTRY_CHANNEL_ID = '1501499421983244338';
export const REPORT_CHANNEL_ID = '1501499446612066375';
export const CONTACT_CHANNEL_ID = '1502303477806923787';
export const EPHEMERAL = 1 << 6;
export const COMPONENTS_V2 = 1 << 15;
