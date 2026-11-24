<template>
	<AsyncState :loading="loading" :error="error" :empty="data?.data.length === 0">
		<Paginator v-if="data" :items="data.data">
			<template #default="{ item }">
				<GuestbookEntry :entry="item" :clamp="limitItems" />
			</template>
		</Paginator>
	</AsyncState>
</template>

<script setup lang="ts">
const props = defineProps<{
	limitItems?: boolean;
}>();

import AsyncState from '@components/ui/AsyncState.vue';
import { useWorker } from '@composables/useWorker';
import GuestbookEntry from '@components/guestbook/GuestbookEntry.vue';
import { onMounted } from 'vue';
import Paginator from '@components/ui/Paginator.vue';
import type { GETGuestbook } from '@website/lib';

const { loading, error, data, useFetch } = useWorker<GETGuestbook>('guestbook');
const handler = (data: GETGuestbook) => (props.limitItems ? { ...data, data: data.data.slice(0, 5) } : data);

onMounted(() => useFetch({ handler }));
</script>
