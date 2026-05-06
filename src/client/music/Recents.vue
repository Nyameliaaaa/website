<template>
    <div class="mt-3">
        <AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
            <MusicGrid v-if="data" :data="migrateDataFormat(data)" @aria="createAria" @alt="createAlt" />
        </AsyncState>
    </div>
</template>

<script setup lang="ts">
import type { Album, MusicGridItem, Recent } from '@lib/types';
import AsyncState from '@client/components/AsyncState.vue';
import MusicGrid from '@client/components/MusicGrid.vue';
import { useWorker } from '@client/composables/useWorker';
import { onMounted } from 'vue';

const props = defineProps<{
    preview?: boolean;
}>();

const migrateDataFormat = (data: Recent[]): MusicGridItem[] => {
    return data.map(track => ({
        name: track.name,
        image: track.image,
        url: track.url,
        secondaryText: track.artist,
        tertiaryText: track.album
    }));
};

const createAria = (item: MusicGridItem) => {
    return `${item.name} by ${item.secondaryText}`;
};

const createAlt = (item: MusicGridItem) => {
    return `${item.name} by ${item.secondaryText}`;
};

const { loading, error, data, useFetch } = useWorker<Recent[]>();

onMounted(() => useFetch('lastfm/recent', data => (props.preview ? data.slice(0, 5) : data)));
</script>
