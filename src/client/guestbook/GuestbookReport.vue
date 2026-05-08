<template>
    <AsyncState :loading="loading" :error="error" :empty="false">
        <GuestbookEntry v-if="data" :entry="data" />
    </AsyncState>

    <hr class="border border-dashed border-ctp-crust my-2" />

    <div class="mb-4 w-full">
        <label :class="formFieldLabel" for="message">message <span :class="formFieldRequired">*</span></label>
        <textarea
            :class="['h-20 resize-none my-1', formField, outline]"
            v-model="form.message"
            placeholder="whats wrong w this message :P"
            required="true"
            minlength="1"
            id="message"
            aria-describedby="message-desc"
        />
        <p v-if="errors.message" id="message-desc" :class="formFieldDesc">
            <span class="text-ctp-maroon">{{ errors.message }}</span>
        </p>
    </div>

    <button
        @click="submit"
        :class="[
            'transition-colors duration-300',
            'py-1 px-5 rounded-sm text-ctp-subtext0',
            outline,
            {
                'bg-ctp-base hover:bg-ctp-pink hover:text-ctp-crust cursor-pointer': !mutating && !mutationError,
                'bg-ctp-crust': mutating ?? mutationError
            }
        ]"
        :disabled="mutating ?? mutationError"
        id="submit"
        aria-describedby="submit-desc"
    >
        <div v-if="mutating" class="flex flex-row items-center gap-2">
            <Icon icon="mdi:loading" class="animate-spin" size="24" />
            <p>reporting</p>
        </div>
        <p v-else>report</p>
    </button>
    <p :class="[formFieldDesc, 'mt-1']" id="submit-desc">
        <span v-if="justSent" class="text-ctp-green">reported! sending u in a bit</span>
        <span v-else-if="mutationError" class="text-ctp-maroon">something went wrong!</span>
        <span v-else-if="hasErrors" class="text-ctp-maroon">check the fields and try again!</span>
    </p>
</template>

<script setup lang="ts">
import AsyncState from '@client/components/AsyncState.vue';
import GuestbookEntry from '@client/components/GuestbookEntry.vue';
import { useMutation } from '@client/composables/useMutation';
import { useWorker } from '@client/composables/useWorker';
import { Icon } from '@iconify/vue';
import { formFieldDesc, formFieldLabel, formFieldRequired, outline } from '@lib/classes';
import type { GuestbookItem } from '@lib/types';
import { computed, onMounted, reactive, ref } from 'vue';

const id = new URLSearchParams(window.location.search).get('id');
const { loading, error, data, useFetch } = useWorker<GuestbookItem>();
const formField = 'block w-full bg-ctp-base border-none rounded-sm placeholder-ctp-subtext0 text-ctp-text';
const justSent = ref(false);

const form = reactive({
    message: ''
});

const errors = reactive({
    message: ''
});

const { mutating, mutate, mutationError } = useMutation<typeof form>(`guestbook/${id}/report`);
const hasErrors = computed(() => Object.values(errors).some(x => x !== null && x !== ''));

const submit = async () => {
    Object.assign(errors, { name: '', message: '', email: '' });

    if (!form.message) {
        errors.message = 'a message is required!';
    }

    if (hasErrors.value) {
        return;
    }

    const ok = await mutate(form);

    if (ok) {
        Object.assign(form, { message: '' });
        justSent.value = true;
        setTimeout(() => (window.location.href = '/guestbook'), 3000);
    }
};
onMounted(() => useFetch(`guestbook/${id}`));
</script>
