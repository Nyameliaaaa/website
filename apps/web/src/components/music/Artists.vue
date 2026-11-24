<template>
	<div class="mt-3">
		<AsyncState :loading="loading" :error="error" :empty="data?.data.length === 0">
			<MediaGrid v-if="data" :data="migrateDataFormat(data)" />
		</AsyncState>
	</div>
</template>

<script setup lang="ts">
import { useWorker } from '@/composables/useWorker';
import AsyncState from '@components/ui/AsyncState.vue';
import MediaGrid from '@components/ui/MediaGrid.vue';
import type { MediaGridItem } from '@lib/types';
import type { GETLastFMArtists } from '@website/lib';
import { onMounted } from 'vue';

const migrateDataFormat = (data: GETLastFMArtists): MediaGridItem[] => {
	return data.data.map(artist => ({
		name: artist.name,
		image: artist.image ?? '',
		url: artist.url,
		secondaryText: `${artist.playcount} plays`,
		cardItem: {
			aria: `${artist.name} ${artist.playcount} plays`,
			alt: `${artist.name}`,
		},
	}));
};

const { loading, error, data, useFetch } = useWorker<GETLastFMArtists>('lastfm/artists');

onMounted(() => useFetch());
</script>
