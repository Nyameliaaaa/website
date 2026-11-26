import { GETArray } from './helpers';

export interface MusicRecentSong {
	name: string;
	artist: string;
	album: string;
	image: string;
	url: string;
}

export interface MusicArtist {
	name: string;
	url: string;
	playcount: number;
	image?: string;
}

export interface MusicAlbum {
	name: string;
	image: string;
	url: string;
	artist: string;
	playcount: string;
}

export type GETMusicRecentSongs = GETArray<MusicRecentSong>;
export type GETMusicTopArtists = GETArray<MusicArtist>;
export type GETMusicTopAlbums = GETArray<MusicAlbum>;
