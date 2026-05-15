<template>
	<AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
		<Paginator v-if="data" :items="data">
			<template #default="{ item }">
				<GuestbookEntry :entry="item" />
			</template>
		</Paginator>
	</AsyncState>
</template>

<script setup lang="ts">
const props = defineProps<{
	limitItems?: boolean;
}>();

import AsyncState from '@client/components/AsyncState.vue';
import { useWorker } from '@client/composables/useWorker';
import GuestbookEntry from '@client/components/GuestbookEntry.vue';
import { onMounted } from 'vue';
import Paginator from '@client/components/Paginator.vue';
import type { GETGuestbook } from '@website/lib';

const { loading, error, data, useFetch } = useWorker<GETGuestbook[]>('guestbook');
const handler = (data: GETGuestbook[]) => (props.limitItems ? data.slice(0, 5) : data);

onMounted(() => useFetch({ handler }));
</script>
