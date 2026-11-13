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

		<textarea
			v-if="isTextArea"
			v-model="value"
			:id="name"
			:name="name"
			:class="['my-1 h-32 resize-none', formField, outline]"
			:placeholder="placeholder"
			:aria-invalid="!!errorMessage"
			:aria-describedby="`${name}-description`"
			@blur="handleBlur"
		/>

		<input
			v-else
			v-model="value"
			:id="name"
			:name="name"
			:type="type"
			:class="[formField, outline, { 'my-1': errorMessage || description, 'mt-1': !(errorMessage && description) }]"
			:placeholder="placeholder"
			:aria-invalid="!!errorMessage"
			:aria-describedby="ariaDescribedBy"
			@blur="handleBlur"
		/>

		<p :id="`${name}-error`" :class="formFieldDesc">
			<span v-if="errorMessage" class="text-ctp-maroon">
				{{ errorMessage }}
			</span>
		</p>
	</div>
</template>

<script setup lang="ts">
import { formFieldLabel, formFieldDesc, formFieldOptional, formFieldRequired, outline, formField } from '@lib/classes';

import { useField } from 'vee-validate';
import { computed, type InputTypeHTMLAttribute } from 'vue';

const props = withDefaults(
	defineProps<{
		name: string;
		label: string;
		description?: string;
		placeholder?: string;
		type?: InputTypeHTMLAttribute;
		isTextArea?: boolean;
		required?: boolean;
	}>(),
	{
		type: 'text',
		isTextArea: false,
	}
);

const { value, errorMessage, handleBlur, meta } = useField<string>(() => props.name);

const ariaDescribedBy = computed(() => {
	return (
		[props.description && `${name}-description`, errorMessage && `${name}-error`].filter(Boolean).join(' ') || undefined
	);
});
</script>
