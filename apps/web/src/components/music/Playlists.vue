<template>
	<div class="mt-3">
		<MediaGrid v-if="data" :data="migrateDataFormat(data)" :clip-data="false" />
	</div>
</template>

<script setup lang="ts">
import type { MediaGridItem, Playlist } from '@typings/media';
import MediaGrid from '@components/ui/MediaGrid.vue';
import { playlists } from '@data/playlists';

const migrateDataFormat = (data: Playlist[]): MediaGridItem[] => {
	return data.map(playlist => ({
		name: playlist.name,
		imageSet: [playlist.image],
		url: playlist.url,
		secondaryText: playlist.content,
		cardItem: {
			aria: `${playlist.name} (${playlist.content})`,
			alt: `${playlist.name} (${playlist.content})`,
		},
	}));
};

const data = playlists.sort((a, b) => {
	if (b.name > a.name) return -1;
	if (b.name < a.name) return 1;
	return 0;
});
</script>
