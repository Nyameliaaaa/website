<template>
	<div class="mt-3">
		<AsyncState :loading="loading" :error="error" :empty="data?.data.length === 0">
			<MusicGrid v-if="data" :data="migrateDataFormat(data)" />
		</AsyncState>
	</div>
</template>

<script setup lang="ts">
import AsyncState from '@components/ui/AsyncState.vue';
import MusicGrid from '@components/ui/MusicGrid.vue';
import { useWorker } from '@/composables/useWorker';
import type { MusicGridItem } from '@lib/types';
import type { GETLastFMAlbums } from '@website/lib';
import { onMounted } from 'vue';

const migrateDataFormat = (data: GETLastFMAlbums): MusicGridItem[] => {
	return data.data.map(album => ({
		name: album.name,
		image: album.image,
		url: album.url,
		secondaryText: album.artist,
		tertiaryText: `${album.playcount} plays`,
		cardItem: {
			aria: `${album.name} by ${album.artist} — ${album.playcount} plays`,
			alt: `${album.name} by ${album.artist}`,
		},
	}));
};

const { loading, error, data, useFetch } = useWorker<GETLastFMAlbums>('lastfm/albums');

onMounted(() => useFetch());
</script>
