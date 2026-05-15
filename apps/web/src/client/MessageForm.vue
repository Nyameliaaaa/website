<template>
	<div class="flex flex-col gap-2 lg:flex-row">
		<FormField
			label="name"
			id="name"
			v-model="form.name"
			type="text"
			placeholder="your name"
			:errors="errors.name"
			description="doesn't have to be your legal name"
			required
		/>
		<FormField
			label="email"
			id="email"
			v-model="form.email"
			type="email"
			placeholder="hi@example.com"
			:errors="errors.email"
			description="i need your email to respond"
			required
		/>
	</div>

	<div class="my-3 w-full">
		<FormField
			label="message"
			id="message"
			placeholder="what do u wanna say"
			is-text-area
			required
			v-model="form.message"
			:errors="errors.message"
		/>
	</div>

	<FormButton
		:justMutated="justMutated"
		:mutation-error="mutationError"
		:isMutating="isMutating"
		:has-errors="hasErrors"
		action-text="send :3"
		loading-text="sending :3"
		done-text="sent! sending u back in a bit ^^"
		@submit="submit"
	/>
</template>

<script setup lang="ts">
import FormButton from '@client/components/FormButton.vue';
import FormField from '@client/components/FormField.vue';
import { useMutation } from '@client/composables/useMutation';
import { useSubmitHelpers } from '@client/composables/useSubmitHelpers';
import { isValidEmail } from '@lib/helpers';
import type { MessagePayload } from '@lib/types';

const { mutate, mutationError } = useMutation<MessagePayload>('message');
const { isMutating, form, errors, hasErrors, justMutated, useSubmitWrap } = useSubmitHelpers<
	MessagePayload,
	MessagePayload
>(
	{
		name: '',
		message: '',
		email: ''
	},
	{
		name: '',
		message: '',
		email: ''
	}
);

const submit = useSubmitWrap(
	async () => {
		if (!form.name) {
			errors.name = 'a name is required';
		}

		if (!form.message) {
			errors.message = 'a message is required';
		}

		if (!form.email) {
			errors.email = 'an email is a required';
		}

		if (form.email && !isValidEmail(form.email)) {
			errors.email = "that doesn't look like a valid email";
		}
	},
	async () => await mutate(form),
	async () => {
		setTimeout(() => (window.location.href = '/contact'), 3000);
	}
);
</script>
