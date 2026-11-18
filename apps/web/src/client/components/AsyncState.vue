<template>
	<component :is="static ? 'div' : TransitionGroup" v-bind="static ? {} : transitionProps" tag="div">
		<slot name="loading" v-if="loading">
			<div :class="duringBox">
				<Icon icon="mdi:loading" class="animate-spin" size="18" />
				<p>loading {{ '<3' }}</p>
			</div>
		</slot>
		<slot name="error" v-else-if="error">
			<div :class="duringBox">
				<Icon icon="mdi:alert-circle-outline" size="18" />
				<p>something went wrong {{ '<\/3' }}</p>
			</div>
		</slot>
		<slot name="empty" v-else-if="empty">
			<div :class="duringBox">
				<Icon icon="mdi:cup-outline" size="18" />
				<p>no entries {{ '<\/3' }}</p>
			</div>
		</slot>
		<slot v-else />
	</component>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { TransitionGroup } from 'vue';

defineProps<{
	loading: boolean;
	error: boolean;
	empty?: boolean;
	static?: boolean;
}>();

const transitionProps = {
	enterActiveClass: 'transition-opacity duration-200',
	enterFromClass: 'opacity-0',
	enterToClass: 'opacity-100',
	leaveActiveClass: 'transition-opacity duration-200',
	leaveFromClass: 'opacity-100',
	leaveToClass: 'opacity-0',
};

const duringBox =
	'bg-ctp-crust p-2 border-2 border-dashed border-ctp-base rounded-lg flex flex-row items-center justify-center gap-4';
</script>
