<template>
	<div class="flex flex-col gap-2 lg:flex-row">
		<FormField label="name" id="name" v-model="form.name" type="text" placeholder="anonymous" :errors="null" />
		<FormBorderPicker v-model="form.borderColor" />
	</div>

	<div class="my-3 flex flex-col gap-2 lg:flex-row">
		<FormField
			label="email"
			id="email"
			v-model="form.email"
			type="email"
			placeholder="hi@example.com"
			:errors="errors.email"
			description="only visible to amelia"
		/>
		<FormField
			label="url"
			id="url"
			v-model="form.url"
			type="text"
			placeholder="https://gayspace.fr"
			:errors="errors.url"
		/>
	</div>

	<div class="my-3 w-full">
		<FormField
			label="message"
			id="message"
			placeholder="dont be a meanie ^^"
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
		action-text="sign :3"
		loading-text="signing :3"
		done-text="signed! sending u back in a bit ^^"
		@submit="submit"
	/>

	<hr class="border-ctp-crust my-2 border border-dashed" />

	<h2 :class="`${subHeading} mb-2`">preview</h2>
	<GuestbookEntry
		:entry="{
			id: 0,
			name: form.name || 'anonymous',
			message: form.message || 'your message will appear here',
			createdAt: date,
			ameliaReply: null,
			url: form.url ?? null,
			borderColor: form.borderColor ?? 'pink',
		}"
	/>
</template>

<script setup lang="ts">
import FormBorderPicker from '@client/components/FormBorderPicker.vue';
import FormButton from '@client/components/FormButton.vue';
import FormField from '@client/components/FormField.vue';
import GuestbookEntry from '@client/components/GuestbookEntry.vue';
import { useMutation } from '@client/composables/useMutation';
import { useSubmitHelpers } from '@client/composables/useSubmitHelpers';
import { subHeading } from '@lib/classes';
import { isValidEmail, type POSTGuestbook } from '@website/lib';

const date = new Date().toISOString();

const { mutate, mutationError } = useMutation<POSTGuestbook>('guestbook');

const { isMutating, form, errors, hasErrors, justMutated, useSubmitWrap } = useSubmitHelpers<
	POSTGuestbook,
	Partial<POSTGuestbook>
>({ name: '', message: '', email: '', url: '', borderColor: 'pink' }, { name: '', message: '', email: '' });

const submit = useSubmitWrap(
	async () => {
		if (!form.message) {
			errors.message = 'a message is required';
		}

		if (form.email && !isValidEmail(form.email)) {
			errors.email = "that doesn't look like a valid email";
		}

		if (form.url) {
			try {
				new URL(form.url);
			} catch {
				errors.url = "that doesn't look like a valid url";
			}
		}
	},
	async () => {
		const payload: POSTGuestbook = {
			...form,
			name: form.name || 'anonymous',
		};

		return await mutate(payload);
	},
	async () => {
		setTimeout(() => (window.location.href = '/guestbook'), 3000);
	}
);
</script>
