<template>
	<AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
		<Paginator v-if="data" :items="data">
			<template #default="{ item }">
				<div
					class="bg-ctp-base border-ctp-crust my-3 flex flex-col rounded-lg border-2 px-4 py-2 md:flex-row md:items-center md:justify-between"
				>
					<p :class="leadText">{{ item.text }}</p>
					<p :class="[caption, 'text-right']">
						<time :datetime="item.createdAt">
							{{
								new Date(item.createdAt)
									.toLocaleDateString('en-us', {
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})
									.toLowerCase()
							}}
						</time>
					</p>
				</div>
			</template>
		</Paginator>
	</AsyncState>
</template>

<script setup lang="ts">
const props = defineProps<{
	limitItems?: boolean;
}>();

import AsyncState from '@client/components/AsyncState.vue';
import Paginator from '@client/components/Paginator.vue';
import { useWorker } from '@client/composables/useWorker';
import { caption, leadText } from '@lib/classes';
import type { GETStatus } from '@website/lib';
import { onMounted } from 'vue';

const { loading, error, data, useFetch } = useWorker<GETStatus[]>('statuses');

onMounted(() => useFetch());
</script>
