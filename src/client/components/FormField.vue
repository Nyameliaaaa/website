<template>
	<div class="w-full">
		<label :class="formFieldLabel" :for="id"
			>{{ label }} <span v-if="required" :class="formFieldRequired">*</span
			><span v-else :class="formFieldOptional">(optional)</span></label
		>
		<textarea
			v-if="isTextArea"
			:class="['my-1 h-32 resize-none', formField, outline]"
			v-model="model"
			:id="id"
			:type="type"
			:placeholder="placeholder"
			:aria-describedby="`${id}-description`"
			:required="required"
		/>
		<input
			v-else
			:class="[formField, outline, { 'my-1': hasErrors || description, 'mt-1': !(hasErrors && description) }]"
			v-model="model"
			:id="id"
			:type="type"
			:placeholder="placeholder"
			:aria-describedby="`${id}-description`"
			:required="required"
		/>
		<p v-if="hasErrors ?? description" :id="`${id}-description`" :class="formFieldDesc">
			<span v-if="errors" class="text-ctp-maroon">{{ errors }}</span>
			<span v-else-if="description">{{ description }}</span>
		</p>
	</div>
</template>
<script setup lang="ts">
import { formFieldLabel, formFieldDesc, formFieldOptional, formFieldRequired, outline, formField } from '@lib/classes';
import { computed, type InputTypeHTMLAttribute } from 'vue';

const model = defineModel<string>();
const props = defineProps<{
	label: string;
	description?: string;
	required?: boolean;
	id: string;
	type?: InputTypeHTMLAttribute;
	errors?: string;
	placeholder?: string;
	isTextArea?: boolean;
}>();

const hasErrors = computed(() => !!props.errors);
</script>
