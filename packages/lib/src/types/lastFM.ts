import { GETArray } from './helpers';

export interface LastFMRecent {
	name: string;
	artist: string;
	album: string;
	image: string;
	url: string;
}

export interface LastFMArtist {
	name: string;
	url: string;
	playcount: number;
}

export interface LastFMAlbum {
	name: string;
	image: string;
	url: string;
	artist: string;
	playcount: string;
}

export type GETLastFMRecent = GETArray<LastFMRecent>;
export type GETLastFMArtists = GETArray<LastFMArtist>;
export type GETLastFMAlbums = GETArray<LastFMAlbum>;
