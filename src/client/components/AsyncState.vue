<template>
	<TransitionGroup
		v-if="!static"
		tag="div"
		enter-active-class="transition-opacity duration-200"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition-opacity duration-200"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
		mode="out-in"
	>
		<div v-if="loading" :class="duringBox">
			<Icon icon="mdi:loading" :class="[body, 'animate-spin']" size="18" />
			<p :class="body">loading {{ '<3' }}</p>
		</div>
		<div v-else-if="error" :class="duringBox">
			<Icon icon="mdi:alert-circle-outline" :class="body" size="18" />
			<div :class="body">something went wrong {{ '<\/3' }}</div>
		</div>
		<div v-else-if="empty" :class="duringBox">
			<Icon icon="mdi:cup-outline" :class="body" size="18" />
			<div :class="body">no entries {{ '<\/3' }}</div>
		</div>
		<slot v-else />
	</TransitionGroup>
	<div v-else>
		<div v-if="loading" :class="duringBox">
			<Icon icon="mdi:loading" :class="[body, 'animate-spin']" size="18" />
			<p :class="body">loading {{ '<3' }}</p>
		</div>
		<div v-else-if="error" :class="duringBox">
			<Icon icon="mdi:alert-circle-outline" :class="body" size="18" />
			<div :class="body">something went wrong {{ '<\/3' }}</div>
		</div>
		<div v-else-if="empty" :class="duringBox">
			<Icon icon="mdi:cup-outline" :class="body" size="18" />
			<div :class="body">no entries {{ '<\/3' }}</div>
		</div>
		<slot v-else />
	</div>
</template>

<script setup lang="ts">
import { body } from '@lib/classes';
import { TransitionGroup } from 'vue';
import { Icon } from '@iconify/vue';

defineProps<{
	loading: boolean;
	error: boolean;
	empty?: boolean;
	static?: boolean;
}>();

const duringBox =
	'bg-ctp-crust p-2 border-2 border-dashed border-ctp-base rounded-lg flex flex-row items-center justify-center gap-4';
</script>
