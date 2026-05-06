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

const migrateDataFormat = (data: Album[]): MusicGridItem[] => {
    return data.map(album => ({
        name: album.name,
        image: album.image,
        url: album.url,
        secondaryText: album.artist,
        tertiaryText: `${album.playcount} plays`
    }));
};

const createAria = (item: MusicGridItem) => {
    return `${item.name} by ${item.secondaryText} — ${item.tertiaryText} plays`;
};

const createAlt = (item: MusicGridItem) => {
    return `${item.name} by ${item.secondaryText}`;
};

const { loading, error, data, useFetch } = useWorker<Album[]>();

onMounted(() => useFetch('lastfm/albums'));
</script>
