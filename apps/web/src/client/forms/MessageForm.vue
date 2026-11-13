<template>
	<form @submit.prevent="submit" novalidate>
		<div class="flex flex-col gap-2 lg:flex-row">
			<Field
				label="name"
				description="doesn't have to be your legal name"
				name="name"
				placeholder="your name"
				required
			/>

			<Field
				label="email"
				description="i need your email to respond"
				name="email"
				type="email"
				placeholder="hi@example.com"
				required
			/>
		</div>

		<div class="my-3 w-full">
			<Field name="message" label="message" placeholder="what do u wanna say" is-text-area />
		</div>

		<SubmitButton
			:mutation-status="mutationStatus"
			action-text="send :3"
			loading-text="sending :3"
			done-text="sent! sending u back in a bit ^^"
		/>
	</form>
</template>

<script setup lang="ts">
import SubmitButton from '@client/components/forms/SubmitButton.vue';
import Field from '@client/components/forms/Field.vue';
import { useMutation } from '@client/composables/useMutation';
import { type POSTMessage } from '@website/lib';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { contactSchema } from '@website/lib';
import { useFormSubmit } from '@client/composables/useFormSubmit';

const { mutate } = useMutation<POSTMessage>('message');

const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(contactSchema),
	initialValues: {
		name: '',
		email: '',
		message: '',
	},
});

const { status: mutationStatus, execute } = useFormSubmit<POSTMessage>(values => mutate(values), {
	onSuccess: () => {
		setTimeout(() => {
			window.location.href = '/contact';
		}, 3000);
	},
});

const submit = handleSubmit(async values => {
	await execute(values);
});
</script>
