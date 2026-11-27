<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
	images: string[];
	alt: string;
	class?: string;
}>();

const index = ref(0);
const src = computed(() => props.images[index.value]);

function onError() {
	if (index.value < props.images.length - 1) {
		index.value++;
	}
}
</script>

<template>
	<img :src="src" :alt="alt" :class="props.class" @error="onError" />
</template>
