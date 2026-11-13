<template>
	<form novalidate @submit.prevent="submit">
		<div class="flex flex-col gap-2 lg:flex-row">
			<Field label="name" description="any name u want" name="name" type="text" placeholder="anonymous" required />
			<SelectMenu
				label="border color"
				description="choose your message's color"
				name="borderColor"
				:options="CATPPUCCIN_MACCHIATO_COLORS.map(val => ({ label: val, value: val }))"
				required
			>
				<template #selected="{ value }">
					<span :style="{ color: `var(--catppuccin-color-${value})` }">{{ value }}</span>
				</template>
				<template #option="{ option, selected }">
					<span :style="{ color: `var(--catppuccin-color-${option.label})` }">
						{{ option.label }}
					</span>
				</template>
			</SelectMenu>
		</div>

		<div class="my-3 flex flex-col gap-2 lg:flex-row">
			<Field
				label="email"
				description="this'll be visible only to amelia"
				name="email"
				type="email"
				placeholder="hi@example.com"
			/>
			<Field
				label="url"
				description="any website or profile of yours!"
				name="url"
				type="text"
				placeholder="https://gayspace.org"
			/>
		</div>

		<div class="my-3 w-full">
			<Field
				label="message"
				description="keep it nice :P i may delete ur message otherwise"
				name="message"
				placeholder="what do u wanna say :p"
				is-text-area
				required
			/>
		</div>

		<SubmitButton
			:mutation-status="mutationStatus"
			action-text="sign :3"
			loading-text="signing :3"
			done-text="signed! sending u back in a bit ^^"
		/>

		<hr class="border-ctp-crust my-2 border border-dashed" />

		<h2 :class="`${subHeading} mb-2`">preview</h2>
		<GuestbookEntry :entry="entry" />
	</form>
</template>

<script setup lang="ts">
import SubmitButton from '@client/components/forms/SubmitButton.vue';
import Field from '@client/components/forms/Field.vue';
import SelectMenu from '@client/components/forms/SelectMenu.vue';
import { useMutation } from '@client/composables/useMutation';
import { CATPPUCCIN_MACCHIATO_COLORS, postGuestbookSchema, type POSTGuestbook } from '@website/lib';
import GuestbookEntry from '@client/components/GuestbookEntry.vue';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useFormSubmit } from '@client/composables/useFormSubmit';
import { subHeading } from '@lib/classes';
import { computed } from 'vue';

const { mutate } = useMutation<POSTGuestbook>('guestbook');
const date = computed(() => new Date().toISOString());
const entry = computed(() => {
	return {
		id: 0,
		name: values.name || 'anonymous',
		message: values.message || 'your message will appear here',
		createdAt: date.value,
		ameliaReply: null,
		url: values.url ?? null,
		borderColor: values.borderColor ?? 'pink',
	};
});

const { handleSubmit, values } = useForm({
	validationSchema: toTypedSchema(postGuestbookSchema),
	initialValues: {
		name: '',
		email: '',
		message: '',
		url: '',
		borderColor: 'pink',
	},
});

const { status: mutationStatus, execute } = useFormSubmit<POSTGuestbook>(values => mutate(values), {
	onSuccess: () => {
		setTimeout(() => {
			window.location.href = '/guestbook';
		}, 3000);
	},
});

const submit = handleSubmit(async values => {
	await execute(values);
});
</script>
