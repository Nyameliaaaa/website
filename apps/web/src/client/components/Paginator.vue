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

							'bg-ctp-crust cursor-not-allowed': currentPage === 1,
						},
					]"
					:disabled="currentPage === 1"
					@click="currentPage--"
				>
					<Icon icon="mdi:chevron-left" size="24" />
				</button>
				<span class="bg-ctp-mantle text-ctp-subtext0 p-2 font-semibold">{{ currentPage }} / {{ totalPages }}</span>
				<span class="bg-ctp-mantle text-ctp-subtext1 p-2">{{ startItems }}–{{ endItems }} of {{ items.length }}</span>
				<button
					:class="[
						'text-ctp-subtext0 h-full p-2',
						{
							'bg-ctp-base hover:text-ctp-subtext1 hover:bg-ctp-surface0 cursor-pointer transition-all duration-300':
								currentPage !== totalPages,
							[outline]: currentPage !== totalPages,
							'bg-ctp-crust cursor-not-allowed': currentPage === totalPages,
						},
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
const amount = props.perPage ?? 8;

const totalPages = computed(() => Math.ceil(props.items.length / amount));

const paginated = computed(() => {
	const start = (currentPage.value - 1) * amount;
	return props.items.slice(start, start + amount);
});

const startItems = computed(() => amount * (currentPage.value - 1) + 1);
const endItems = computed(() =>
	props.items.length > amount * currentPage.value ? amount * currentPage.value : props.items.length
);
</script>
