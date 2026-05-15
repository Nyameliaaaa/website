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
			:class="[formField, outline, { 'my-1': errors || description, 'mt-1': !(errors && description) }]"
			v-model="model"
			:id="id"
			:type="type"
			:placeholder="placeholder"
			:aria-describedby="`${id}-description`"
			:required="required"
		/>

		<p :id="`${id}-description`" :class="formFieldDesc">
			<span v-if="errors" class="text-ctp-maroon">{{ errors }}</span>
			<span v-else-if="description">{{ description }}</span>
		</p>
	</div>
</template>
<script setup lang="ts">
import { formFieldLabel, formFieldDesc, formFieldOptional, formFieldRequired, outline, formField } from '@lib/classes';
import type { IsNullable } from '@website/lib';
import { type InputTypeHTMLAttribute } from 'vue';

const model = defineModel<IsNullable<string>>();
const props = defineProps<{
	label: string;
	id: string;
	description?: string;
	placeholder?: string;
	errors: IsNullable<string>;
	required?: boolean;
	type?: InputTypeHTMLAttribute;
	isTextArea?: boolean;
}>();
</script>
