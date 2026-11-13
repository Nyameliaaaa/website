<template>
	<AsyncState :loading="loading" :error="error" :empty="false">
		<GuestbookEntry v-if="data" :entry="data" />
	</AsyncState>

	<hr class="border-ctp-crust my-2 border border-dashed" />

	<form novalidate @submit.prevent="submit">
		<div class="mb-4 w-full">
			<Field
				label="message"
				id="message"
				name="message"
				placeholder="what's wrong w this message"
				is-text-area
				required
			/>
		</div>

		<SubmitButton
			:mutation-status="mutationStatus"
			action-text="report"
			loading-text="reporting :3"
			done-text="reported! sending u back in a bit ^^"
			@submit="submit"
		/>
	</form>
</template>

<script setup lang="ts">
// entry
import AsyncState from '@client/components/AsyncState.vue';
import GuestbookEntry from '@client/components/GuestbookEntry.vue';
import { useWorker } from '@client/composables/useWorker';
import { postGuestbookReportSchema, type GETGuestbookID, type POSTGuestbookIDReport } from '@website/lib';
import { onMounted } from 'vue';

// form
import Field from '@client/components/forms/Field.vue';
import SubmitButton from '@client/components/forms/SubmitButton.vue';
import { useFormSubmit } from '@client/composables/useFormSubmit';
import { useMutation } from '@client/composables/useMutation';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

const id = new URLSearchParams(window.location.search).get('id');
const { loading, error, data, useFetch } = useWorker<GETGuestbookID>(`guestbook/${id}`);

const { mutate } = useMutation<POSTGuestbookIDReport>(`guestbook/${id}/report`);

const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(postGuestbookReportSchema),
	initialValues: {
		message: '',
	},
});

const { status: mutationStatus, execute } = useFormSubmit<POSTGuestbookIDReport>(values => mutate(values), {
	onSuccess: () => {
		setTimeout(() => {
			window.location.href = '/guestbook';
		}, 3000);
	},
});

const submit = handleSubmit(async values => {
	await execute(values);
});

onMounted(() => useFetch());
</script>
