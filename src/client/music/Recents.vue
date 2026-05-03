<template>
    <AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
        <MusicGrid v-if="data" :data="data" @aria="createAria" />
    </AsyncState>
</template>

<script setup lang="ts">
import type { Album, Recent } from '@/types';
import AsyncState from '@client/components/AsyncState.vue';
import MusicGrid from '@client/components/MusicGrid.vue';
import { useWorker } from '@/client/composables/useWorker';
import { onMounted } from 'vue';

const props = defineProps<{
    preview?: boolean;
}>();

const createAria = (item: Recent | Album) => {
    return `${item.name} by ${item.artist}`;
};

const { loading, error, data, useFetch } = useWorker<Recent[]>();

onMounted(() => useFetch('lastfm/recent', data => (props.preview ? data.slice(0, 5) : data)));
</script>
