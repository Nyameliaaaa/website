<template>
	<div
		class="bg-ctp-base mb-2 w-full rounded-lg border-2 p-3"
		:style="{ borderColor: `var(--catppuccin-color-${entry.borderColor})` }"
	>
		<div class="flex flex-row items-center justify-between">
			<p :class="caption">{{ entry.name }}</p>
			<a
				v-if="entry.url"
				target="_blank"
				rel="noopener noreferrer"
				:class="[
					'group hover:text-ctp-pink flex flex-row items-center gap-2 transition-all duration-300',
					outline,
					'w-fit'
				]"
				:href="entry.url"
				:aria-label="`${entry.name}'s website'`"
			>
				<Icon icon="mdi:link-variant" :class="iconButton" size="16" />
			</a>
		</div>
		<div class="my-1">
			<p :class="leadText">{{ entry.message }}</p>
		</div>

		<div v-if="entry.ameliaReply" class="bg-ctp-mantle my-2 rounded-lg p-2">
			<div class="flex flex-row items-center gap-2">
				<Icon icon="mdi:reply" :class="caption" size="24" />
				<p :class="caption">amelia replied</p>
			</div>
			<p :class="leadText">{{ entry.ameliaReply }}</p>
		</div>

		<div class="flex flex-row items-center justify-between">
			<time :class="caption" :datetime="entry.createdAt">
				{{
					new Date(entry.createdAt)
						.toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})
						.toLowerCase()
				}}
			</time>
			<a
				v-if="entry.id"
				:class="[
					'group hover:text-ctp-pink flex flex-row items-center gap-2 transition-all duration-300',
					outline,
					'w-fit'
				]"
				:href="`/guestbook/report?id=${entry.id}`"
				aria-label="report this entry"
			>
				<Icon icon="mdi:flag" :class="iconButton" size="16" />
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { caption, iconButton, leadText, outline } from '@lib/classes';
import type { GETGuestbook } from '@website/lib';

defineProps<{
	entry: GETGuestbook;
}>();
</script>
