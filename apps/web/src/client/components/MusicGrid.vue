<template>
	<div
		class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
		role="region"
		@click.self="activeItem = null"
	>
		<a
			v-for="(item, index) in data"
			:href="item.url"
			target="_blank"
			rel="noopener noreferrer"
			:class="[
				'group hover:border-ctp-pink focus:ring-ctp-pink focus:ring-offset-ctp-base text-ctp-text relative block aspect-square overflow-hidden rounded-lg border-2 border-transparent transition duration-300 focus:ring-2 focus:outline-none',
				activeItem === `${index}/${item.url}` ? 'is-active' : ''
			]"
			:aria-label="item.cardItem?.aria ?? ''"
			@click="handleClick($event, item.url, index)"
		>
			<img
				v-if="item.image"
				:src="item.image"
				:alt="item.cardItem?.alt ?? ''"
				class="bg-ctp-crust h-full w-full object-cover transition duration-300 group-hover:opacity-90 group-hover:blur-sm group-[.is-active]:opacity-90"
			/>
			<div
				class="bg-ctp-mantle/60 pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100"
			>
				<p class="text-ctp-text w-full text-xl font-bold">{{ item.name }}</p>
				<p class="text-ctp-text w-full text-base">{{ item.secondaryText }}</p>
				<template v-if="item.tertiaryText">
					<p class="text-ctp-subtext1 text-sm">{{ item.tertiaryText }}</p>
				</template>
			</div>
		</a>
	</div>
</template>

<script setup lang="ts">
import type { MusicGridItem } from '@lib/types';
import { onUnmounted, ref } from 'vue';

defineProps<{ data: MusicGridItem[] }>();

const activeItem = ref<string | null>(null);
let timeout: ReturnType<typeof setTimeout>;

const handleClick = (e: MouseEvent, url: string, index: number) => {
	if (activeItem.value !== `${index}/${url}`) {
		e.preventDefault();
		clearTimeout(timeout);

		activeItem.value = `${index}/${url}`;

		timeout = setTimeout(() => {
			activeItem.value = null;
		}, 3000);
	} else {
		activeItem.value = null;
	}
};

onUnmounted(() => clearTimeout(timeout));
</script>
