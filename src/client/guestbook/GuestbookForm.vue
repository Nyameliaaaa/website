<template>
    <label :class="label" for="name">name</label>
    <input
        :class="['block w-full bg-ctp-base border-none mb-2 rounded-smplaceholder-ctp-subtext1 text-ctp-text', outline]"
        v-model="form.name"
        placeholder="anonymous"
        id="name"
    />

    <label :class="label" for="message">message <span>*</span></label>
    <textarea
        :class="[
            'h-20 resize-none',
            'block w-full bg-ctp-base border-none mb-2 rounded-smplaceholder-ctp-subtext1 text-ctp-text',
            outline
        ]"
        v-model="form.message"
        placeholder="dont be a meanie ^^"
        required="true"
        minlength="1"
        id="message"
    />

    <label :class="label" for="email">email</label>
    <p :class="label">only visible to amelia, u dont have to include this :p</p>
    <input
        :class="['block w-full bg-ctp-base border-none mb-2 rounded-smplaceholder-ctp-subtext1 text-ctp-text', outline]"
        v-model="form.email"
        autocomplete="nope"
        placeholder="hi@example.com"
        type="email"
        id="email"
    />

    <button
        @click="emit('submit')"
        :class="[
            'transition-colors duration-300',
            'bg-ctp-base py-1 px-5 rounded-sm text-ctp-subtext0',
            outline,
            'hover:bg-ctp-pink hover:text-ctp-crust cursor-pointer'
        ]"
    >
        sign :3
    </button>
</template>

<script setup lang="ts">
import { label, outline } from '@lib/classes';
import type { GuestbookPayload } from '@lib/types';
defineProps<{
    form: GuestbookPayload;
    mutating: boolean;
    mutationError: boolean;
}>();

const emit = defineEmits<{
    (e: 'submit'): void;
}>();
</script>
