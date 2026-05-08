<template>
    <div class="flex flex-col lg:flex-row gap-2">
        <div class="max-lg:mb-2 w-full">
            <label :class="formFieldLabel" for="name">name <span :class="formFieldRequired">*</span></label>
            <input
                :class="[formField, outline, 'mt-1']"
                v-model="form.name"
                placeholder="your name"
                id="name"
                aria-describedby="name-description"
            />
            <p id="name-description" v-if="errors.name" :class="formFieldDesc">
                <span class="text-ctp-maroon">{{ errors.name }}</span>
            </p>
        </div>
        <div class="w-full">
            <label :class="formFieldLabel" for="email">email <span :class="formFieldRequired">*</span></label>
            <input
                :class="[formField, outline, 'my-1']"
                v-model="form.email"
                autocomplete="nope"
                placeholder="hi@example.com"
                type="email"
                id="email"
                aria-describedby="email-description"
            />
            <p id="email-description" :class="formFieldDesc">
                <span v-if="errors.email" class="text-ctp-maroon">{{ errors.email }}</span>
                <span v-else>i need this to respond</span>
            </p>
        </div>
    </div>

    <div class="my-3 w-full">
        <label :class="formFieldLabel" for="message">message <span :class="formFieldRequired">*</span></label>
        <textarea
            :class="['h-20 resize-none my-1', formField, outline]"
            v-model="form.message"
            placeholder="what do u wanna say"
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
            <p>sending :3</p>
        </div>
        <p v-else>send :3</p>
    </button>
    <p :class="[formFieldDesc, 'mt-1']" id="submit-desc">
        <span v-if="justSent" class="text-ctp-green">sent! sending u back in a bit</span>
        <span v-else-if="mutationError" class="text-ctp-maroon">something went wrong!</span>
        <span v-else-if="hasErrors" class="text-ctp-maroon">check the fields and try again!</span>
    </p>
</template>

<script setup lang="ts">
import { useMutation } from '@client/composables/useMutation';
import { Icon } from '@iconify/vue';
import { formFieldDesc, formFieldLabel, formFieldRequired, outline } from '@lib/classes';
import { isValidEmail } from '@lib/helpers';
import type { MessagePayload } from '@lib/types';
import { computed, reactive, ref } from 'vue';

const formField = 'block w-full bg-ctp-base border-none rounded-sm placeholder-ctp-subtext0 text-ctp-text';
const { mutating, mutate, mutationError } = useMutation<MessagePayload>('message');
const justSent = ref(false);

const form = reactive<MessagePayload>({
    name: '',
    message: '',
    email: ''
});

const errors = reactive({
    name: '',
    message: '',
    email: ''
});

const hasErrors = computed(() => Object.values(errors).some(x => x !== null && x !== ''));

const submit = async () => {
    Object.assign(errors, { name: '', message: '', email: '' });

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

    if (hasErrors.value) {
        return;
    }

    const ok = await mutate(form);

    if (ok) {
        justSent.value = true;
        setTimeout(() => (window.location.href = '/'), 3000);
    }
};
</script>
