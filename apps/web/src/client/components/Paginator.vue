<template>
	<div>
		<div v-for="(item, i) in paginated" :key="i">
			<slot :item="item" />
		</div>

		<div v-if="totalPages > 1" class="mt-2 flex justify-center">
			<div
				class="border-ctp-crust divide-ctp-mantle flex w-fit flex-row items-center divide-x-2 overflow-hidden rounded-lg border-2"
			>
				<button
					:class="[
						'text-ctp-subtext0 h-full p-2',
						{
							'bg-ctp-base hover:text-ctp-subtext1 hover:bg-ctp-surface0 cursor-pointer transition-all duration-300':
								currentPage !== 1,
							[outline]: currentPage !== 1,

							'bg-ctp-mantle cursor-not-allowed': currentPage === 1
						}
					]"
					:disabled="currentPage === 1"
					@click="currentPage--"
				>
					<Icon icon="mdi:chevron-left" size="24" />
				</button>
				<span class="bg-ctp-base text-ctp-text p-2 font-semibold">{{ currentPage }} / {{ totalPages }}</span>
				<button
					:class="[
						'text-ctp-subtext0 h-full p-2',
						{
							'bg-ctp-base hover:text-ctp-subtext1 hover:bg-ctp-surface0 cursor-pointer transition-all duration-300':
								currentPage !== totalPages,
							[outline]: currentPage !== totalPages,
							'bg-ctp-mantle cursor-not-allowed': currentPage === totalPages
						}
					]"
					:disabled="currentPage === totalPages"
					@click="currentPage++"
				>
					<Icon icon="mdi:chevron-right" size="24" />
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
const outline = 'focus-visible:outline-none focus-visible:bg-ctp-surface0';

const props = defineProps<{
	items: T[];
	perPage?: number;
}>();

const currentPage = ref(1);
const _perPage = props.perPage ?? 8;

const totalPages = computed(() => Math.ceil(props.items.length / _perPage));

const paginated = computed(() => {
	const start = (currentPage.value - 1) * _perPage;
	return props.items.slice(start, start + _perPage);
});
</script>
