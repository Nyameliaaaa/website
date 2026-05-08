<template>
    <div :class="{ ['grid grid-cols-1 gap-3 lg:grid-cols-5']: isHomepage }">
        <div class="col-span-2">
            <GuestbookForm :form="form" :mutating="mutating" :mutation-error="mutationError" @submit="submit" />
            <hr v-if="!isHomepage" class="border-ctp-base my-2" />
        </div>
        <div class="col-span-3">
            <AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
                <GuestbookEntry v-for="entry in data" :entry="entry" />

                <IconLink v-if="isHomepage" url="/guestbook" icon="arrow-right" text="see all entries" />
            </AsyncState>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    isHomepage: boolean;
}>();

import AsyncState from '@client/components/AsyncState.vue';
import IconLink from '@client/components/VueIconLink.vue';
import { useMutation } from '@client/composables/useMutation';
import { useWorker } from '@client/composables/useWorker';
import GuestbookEntry from '@client/guestbook/GuestbookEntry.vue';
import GuestbookForm from '@client/guestbook/GuestbookForm.vue';
import type { GuestbookItem, GuestbookPayload } from '@lib/types';
import { onMounted, reactive } from 'vue';

const { loading, error, data, useFetch } = useWorker<GuestbookItem[]>();
const { mutating, mutate, mutationError } = useMutation<GuestbookPayload>('guestbook');
const handler = (data: GuestbookItem[]) => (props.isHomepage ? data.slice(0, 5) : data);

const form = reactive<GuestbookPayload>({
    name: '',
    message: '',
    email: ''
});

const submit = async () => {
    const payload: GuestbookPayload = {
        name: form.name || 'anonymous',
        message: form.message,
        borderColor: form.borderColor ?? 'pink',
        ...(form.url && { url: form.url }),
        ...(form.email && { email: form.email })
    };

    const ok = await mutate(payload);
    if (ok) {
        Object.assign(form, { name: '', message: '', email: '', borderColor: 'pink', url: '' });
        await useFetch('guestbook', handler);
    }
};

onMounted(() => useFetch('guestbook', handler));
</script>
