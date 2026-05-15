<template>
	<div class="mt-3">
		<AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
			<MusicGrid v-if="data" :data="migrateDataFormat(data)" />
		</AsyncState>
	</div>
</template>

<script setup lang="ts">
import AsyncState from '@client/components/AsyncState.vue';
import MusicGrid from '@client/components/MusicGrid.vue';
import { useWorker } from '@client/composables/useWorker';
import type { MusicGridItem } from '@lib/types';
import type { GETLastFMRecent } from '@website/lib';
import { onMounted } from 'vue';

const props = defineProps<{
	preview?: boolean;
}>();

const migrateDataFormat = (data: GETLastFMRecent[]): MusicGridItem[] => {
	return data.map(track => ({
		name: track.name,
		image: track.image,
		url: track.url,
		secondaryText: track.artist,
		tertiaryText: track.album,
		cardItem: {
			aria: `${track.name} by ${track.artist}`,
			alt: `${track.name} by ${track.artist}`,
		},
	}));
};

const { loading, error, data, useFetch } = useWorker<GETLastFMRecent[]>('lastfm/recent');

onMounted(() => useFetch({ handler: data => (props.preview ? data.slice(0, 5) : data) }));
</script>
