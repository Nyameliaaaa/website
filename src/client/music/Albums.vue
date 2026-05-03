<template>
    <div>
        <AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
            <MusicGrid v-if="data" :data="data" @aria="createAria" />
        </AsyncState>
    </div>
</template>

<script setup lang="ts">
import type { Album, Recent } from '@/types';
import AsyncState from '@client/components/AsyncState.vue';
import MusicGrid from '@client/components/MusicGrid.vue';
import { useWorker } from '@/client/composables/useWorker';
import { onMounted } from 'vue';

const createAria = (item: Album | Recent) => {
    if ('playcount' in item) {
        return `${item.name} by ${item.artist} — ${item.playcount} plays`;
    }
};

const { loading, error, data, useFetch } = useWorker<Album[]>();

onMounted(() => useFetch('lastfm/albums'));
</script>
