<template>
	<div class="mt-3">
		<AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				<a
					v-for="artist in data"
					:href="artist.url"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:border-ctp-pink focus:ring-ctp-pink bg-ctp-base rounded-lg border-2 border-transparent p-2 transition duration-300 focus:ring-2 focus:outline-none"
					:aria-label="artist.name"
				>
					<p class="text-ctp-text line-clamp-2 w-full text-xl font-bold">{{ artist.name }}</p>
					<p class="text-ctp-subtext1 text-sm">{{ artist.playcount }} plays</p>
				</a>
			</div>
		</AsyncState>
	</div>
</template>

<script setup lang="ts">
import type { GETLastFMArtist } from '@website/lib';
import AsyncState from '@client/components/AsyncState.vue';
import { useWorker } from '@client/composables/useWorker';
import { onMounted } from 'vue';

const { loading, error, data, useFetch } = useWorker<GETLastFMArtist[]>('lastfm/artists');

onMounted(() => useFetch());
</script>
