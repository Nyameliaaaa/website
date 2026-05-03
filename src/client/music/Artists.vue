<template>
    <AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <a
                v-for="artist in data"
                :href="artist.url"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-md transition p-2 duration-300 border-2 border-transparent hover:border-ctp-pink focus:outline-none focus:ring-2 focus:ring-ctp-pink bg-ctp-base"
                :aria-label="artist.name"
            >
                <p class="line-clamp-2 w-full text-xl font-bold text-ctp-text">{{ artist.name }}</p>
                <p class="text-sm text-ctp-subtext1">{{ artist.playcount }} plays</p>
            </a>
        </div>
    </AsyncState>
</template>

<script setup lang="ts">
import type { Artist } from '@/types';
import AsyncState from '@client/components/AsyncState.vue';
import { useWorker } from '@/client/composables/useWorker';
import { onMounted } from 'vue';

const { loading, error, data, useFetch } = useWorker<Artist[]>();

onMounted(() => useFetch('lastfm/artists'));
</script>
