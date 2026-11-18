<template>
	<div class="w-full">
		<label :class="formFieldLabel" :for="name">
			{{ label }}
			<span v-if="required" :class="formFieldRequired">*</span>
			<span v-else :class="formFieldOptional">(optional)</span>
		</label>

		<p :id="`${name}-description`" :class="formFieldDesc">
			<span v-if="description">
				{{ description }}
			</span>
		</p>

		<slot></slot>

		<p :id="`${name}-error`" :class="formFieldDesc">
			<span v-if="error" class="text-ctp-maroon">
				{{ error }}
			</span>
		</p>
	</div>
</template>

<script setup lang="ts">
import { formFieldDesc, formFieldLabel, formFieldOptional, formFieldRequired } from '@lib/classes';

const props = defineProps<{
	name: string;
	label: string;
	description?: string;
	required?: boolean;
	error?: string;
}>();
</script>
