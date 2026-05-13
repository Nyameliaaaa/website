<template>
    <AsyncState :loading="loading" :error="error" :empty="false">
        <GuestbookEntry v-if="data" :entry="data" />
    </AsyncState>

    <hr class="border border-dashed border-ctp-crust my-2" />

    <div class="mb-4 w-full">
        <FormField
            label="message"
            id="message"
            placeholder="what's wrong w this message"
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
        action-text="report"
        loading-text="reporting :3"
        done-text="reported! sending u back in a bit ^^"
        @submit="submit"
    />
</template>

<script setup lang="ts">
// entry
import type { GuestbookItem } from '@lib/types';
import { onMounted } from 'vue';
import { useWorker } from '@client/composables/useWorker';
import AsyncState from '@client/components/AsyncState.vue';
import GuestbookEntry from '@client/components/GuestbookEntry.vue';

// form
import { useMutation } from '@client/composables/useMutation';
import { useSubmitHelpers } from '@client/composables/useSubmitHelpers';
import FormField from '@client/components/FormField.vue';

const id = new URLSearchParams(window.location.search).get('id');
const { loading, error, data, useFetch } = useWorker<GuestbookItem>(`guestbook/${id}`);
const { isMutating, form, errors, hasErrors, justMutated, useSubmitWrap } = useSubmitHelpers(
    { message: '' },
    { message: '' }
);

const { mutate, mutationError } = useMutation<typeof form>(`guestbook/${id}/report`);

const submit = useSubmitWrap(
    async () => {
        if (!form.message) {
            errors.message = 'a message is required!';
        }
    },
    async () => {
        return await mutate(form);
    },
    async () => {
        setTimeout(() => (window.location.href = '/guestbook'), 3000);
    }
);

onMounted(() => useFetch());
</script>
