<template>
	<a
		:class="[
			'group hover:text-ctp-pink flex flex-row items-center gap-2 transition-all duration-300',
			outline,
			'w-fit'
		]"
		:href="url"
	>
		<Icon :icon="`mdi:${icon}`" :class="iconButton" size="16" />

		<p :class="iconButton">{{ text }}</p>
	</a>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { iconButton, outline } from '@lib/classes';

defineProps<{
	url: string;
	icon: string;
	text: string;
}>();
</script>
