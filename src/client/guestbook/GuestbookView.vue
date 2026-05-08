<template>
    <AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
        <GuestbookEntry v-for="entry in data" :entry="entry" />
    </AsyncState>
</template>

<script setup lang="ts">
const props = defineProps<{
    limitItems?: boolean;
}>();

import AsyncState from '@client/components/AsyncState.vue';
import { useWorker } from '@client/composables/useWorker';
import GuestbookEntry from '@client/components/GuestbookEntry.vue';
import type { GuestbookItem } from '@lib/types';
import { onMounted } from 'vue';

const { loading, error, data, useFetch } = useWorker<GuestbookItem[]>();
const handler = (data: GuestbookItem[]) => (props.limitItems ? data.slice(0, 5) : data);

onMounted(() => useFetch('guestbook', handler));
</script>
