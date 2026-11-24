<template>
	<div class="mt-3">
		<AsyncState :loading="loading" :error="error" :empty="data?.data.length === 0">
			<MediaGrid v-if="data" :data="migrateDataFormat(data)" />
		</AsyncState>
	</div>
</template>

<script setup lang="ts">
import AsyncState from '@components/ui/AsyncState.vue';
import MediaGrid from '@components/ui/MediaGrid.vue';
import { useWorker } from '@/composables/useWorker';
import type { MediaGridItem } from '@lib/types';
import type { GETLastFMRecent } from '@website/lib';
import { onMounted } from 'vue';

const props = defineProps<{
	preview?: boolean;
}>();

const migrateDataFormat = (data: GETLastFMRecent): MediaGridItem[] => {
	return data.data.map(track => ({
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

const { loading, error, data, useFetch } = useWorker<GETLastFMRecent>('lastfm/recent');

onMounted(() => useFetch({ handler: data => (props.preview ? { data: data.data.slice(0, 5) } : data) }));
</script>
