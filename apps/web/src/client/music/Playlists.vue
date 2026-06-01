<template>
	<div class="mt-3">
		<MusicGrid v-if="data" :data="migrateDataFormat(data)" />
	</div>
</template>

<script setup lang="ts">
import type { MusicGridItem, Playlist } from '@lib/types';
import MusicGrid from '@client/components/MusicGrid.vue';
import { playlists } from '@lib/data';

const migrateDataFormat = (data: Playlist[]): MusicGridItem[] => {
	return data.map(playlist => ({
		name: playlist.name,
		image: playlist.image,
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
