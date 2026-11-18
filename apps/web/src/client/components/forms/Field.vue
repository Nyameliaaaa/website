<template>
	<FieldLabel :name="name" :label="label" :description="description" :error="errorMessage" :required="required">
		<component
			:is="isTextArea ? 'textarea' : 'input'"
			:value="value"
			@input="value = ($event.target as HTMLInputElement).value"
			:id="name"
			:name="name"
			:type="isTextArea ? undefined : type"
			:class="[
				'formField',
				outline,
				isTextArea
					? 'my-1 h-32 resize-none'
					: {
							'my-1': errorMessage || description,
							'mt-1': !(errorMessage && description),
						},
			]"
			:placeholder="placeholder"
			:aria-invalid="!!errorMessage"
			:aria-describedby="description && `${name}-description`"
			:aria-errormessage="errorMessage && `${name}-error`"
			@blur="handleBlur"
		/>
	</FieldLabel>
</template>

<script setup lang="ts">
import { outline } from '@lib/classes';

import { useField } from 'vee-validate';
import { computed, type InputTypeHTMLAttribute } from 'vue';
import FieldLabel from './FieldLabel.vue';

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

const { value, errorMessage, handleBlur } = useField<string>(() => props.name);

const ariaDescribedBy = computed(() => {
	return (
		[props.description && `${name}-description`, errorMessage && `${name}-error`].filter(Boolean).join(' ') || undefined
	);
});
</script>
