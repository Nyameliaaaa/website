<template>
	<component :is="static ? 'div' : Transition" v-bind="static ? {} : transitionProps" tag="div">
		<template v-if="loading">
			<slot name="loading">
				<div :class="duringBox">
					<Icon icon="mdi:loading" class="animate-spin" size="18" />
					<p>loading {{ '<3' }}</p>
				</div>
			</slot>
		</template>
		<template v-else-if="error">
			<slot name="error">
				<div :class="duringBox">
					<Icon icon="mdi:alert-circle-outline" size="18" />
					<p>something went wrong {{ '<\/3' }}</p>
				</div>
			</slot>
		</template>
		<template v-else-if="empty">
			<slot name="empty">
				<div :class="duringBox">
					<Icon icon="mdi:cup-outline" size="18" />
					<p>no entries {{ '<\/3' }}</p>
				</div>
			</slot>
		</template>
		<slot v-else />
	</component>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Transition } from 'vue';

defineProps<{
	loading: boolean;
	error: boolean;
	empty?: boolean;
	static?: boolean;
}>();

const transitionProps = {
	mode: 'out-in',
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
