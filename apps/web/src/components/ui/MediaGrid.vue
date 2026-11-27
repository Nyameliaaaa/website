<template>
	<div
		ref="gridEl"
		class="grid grid-cols-2 gap-4 [--cols:2] sm:grid-cols-3 sm:[--cols:3] md:grid-cols-4 md:[--cols:4] lg:grid-cols-5 lg:[--cols:5]"
		role="region"
		@click.self="activeItem = null"
	>
		<a
			v-for="(item, index) in visibleData"
			:href="item.url"
			target="_blank"
			rel="noopener noreferrer"
			:class="[
				'group hover:border-ctp-pink focus:ring-ctp-pink focus:ring-offset-ctp-base text-ctp-text relative block overflow-hidden rounded-lg border-2 border-transparent transition duration-300 focus:ring-2 focus:outline-none',
				aspectRatio,
				activeItem === `${index}/${item.url}` ? 'is-active' : '',
			]"
			:aria-label="item.cardItem?.aria ?? ''"
			@click="handleClick($event, item.url, index)"
			:key="`${index}/${item.url}`"
		>
			<picture>
				<template v-for="(image, i) in item.imageSet">
					<source :srcset="image" v-if="i !== 0" />
				</template>
				<img
					v-if="item.imageSet[0]"
					:src="item.imageSet[0]"
					:alt="item.cardItem?.alt ?? ''"
					class="bg-ctp-crust h-full w-full object-cover transition duration-300 group-hover:opacity-90 group-hover:blur-sm group-[.is-active]:opacity-90"
				/>
			</picture>
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
import type { MediaGridItem } from '@typings/media';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const {
	data,
	aspectRatio = 'aspect-square',
	clipData = true,
} = defineProps<{
	data: MediaGridItem[];
	aspectRatio?: string;
	clipData?: boolean;
}>();

const gridEl = ref<HTMLElement | null>(null);
const cols = ref(2);

const activeItem = ref<string | null>(null);
let timeout: ReturnType<typeof setTimeout>;

const visibleData = computed(() => {
	if (clipData) {
		const fullRows = Math.floor(data.length / cols.value) * cols.value;
		return data.slice(0, fullRows || data.length);
	} else {
		return data;
	}
});

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

const readCols = () => {
	if (!gridEl.value) return;

	cols.value = Number(getComputedStyle(gridEl.value).getPropertyValue('--cols'));
};

onMounted(() => {
	readCols();
	window.addEventListener('resize', readCols);
});
onUnmounted(() => {
	clearTimeout(timeout);
	window.removeEventListener('resize', readCols);
});
</script>
