<template>
    <div class="flex flex-col lg:flex-row gap-2">
        <div class="max-lg:mb-2 w-full">
            <label :class="formFieldLabel" for="name">name <span :class="formFieldOptional">(optional)</span></label>
            <input :class="[formField, outline, 'mt-1']" v-model="form.name" placeholder="your name" id="name" />
        </div>

        <div class="w-full">
            <Listbox v-model="form.borderColor">
                <div class="relative mt-1">
                    <div>
                        <label :class="[formFieldLabel, 'mb-1']" for="colors"
                            >color <span :class="formFieldRequired">*</span></label
                        >
                        <ListboxButton
                            :class="['relative cursor-default py-2 pl-3 pr-10 text-left', formField, outline]"
                            id="colors"
                        >
                            <span
                                class="block truncate"
                                :style="{ color: `var(--catppuccin-color-${form.borderColor})` }"
                                >{{ form.borderColor }}</span
                            >
                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <Icon icon="mdi:chevron-down" class="h-5 w-5 text-subtext-1" aria-hidden="true" />
                            </span>
                        </ListboxButton>
                    </div>

                    <transition
                        enter-active-class="transition-opacity duration-200"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                        leave-active-class="transition-opacity duration-200"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                        mode="out-in"
                    >
                        <ListboxOptions
                            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none"
                        >
                            <ListboxOption
                                v-slot="{ selected }"
                                v-for="(color, i) in CATPPUCCIN_MACCHIATO_COLORS"
                                :key="i"
                                :value="color"
                                as="template"
                            >
                                <li
                                    :class="[
                                        'relative cursor-default select-none py-2 pl-3 pr-10',
                                        { 'bg-ctp-surface0': selected, 'bg-ctp-base hover:bg-ctp-mantle': !selected }
                                    ]"
                                    :style="{ color: `var(--catppuccin-color-${color})` }"
                                >
                                    <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                                        {{ color }}
                                    </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </div>
            </Listbox>
        </div>
    </div>

    <div class="flex flex-co lg:flex-row gap-2 my-3">
        <div class="max-lg:mb-2 w-full">
            <label :class="formFieldLabel" for="email">email <span :class="formFieldOptional">(optional)</span></label>
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
                <span v-else>only visible to amelia</span>
            </p>
        </div>
        <div class="w-full">
            <label :class="formFieldLabel" for="url">url <span :class="formFieldOptional">(optional)</span></label>
            <input
                :class="[formField, outline, 'my-1']"
                v-model="form.url"
                autocomplete="nope"
                placeholder="https://gayspace.fr"
                type="url"
                id="url"
                aria-describedby="url-description"
            />
            <p v-if="errors.url" id="url-description" :class="formFieldDesc">
                <span class="text-ctp-maroon">
                    {{ errors.url }}
                </span>
            </p>
        </div>
    </div>

    <div class="my-3 w-full">
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
            <p>signing :3</p>
        </div>
        <p v-else>sign :3</p>
    </button>
    <p :class="[formFieldDesc, 'mt-1']" id="submit-desc">
        <span v-if="justSent" class="text-ctp-green">signed! sending u in a bit</span>
        <span v-else-if="mutationError" class="text-ctp-maroon">something went wrong!</span>
        <span v-else-if="hasErrors" class="text-ctp-maroon">check the fields and try again!</span>
    </p>

    <hr class="border border-dashed border-ctp-crust my-2" />
    <h2 :class="`${subHeading} mb-2`">preview</h2>
    <GuestbookEntry
        :entry="{
            ...form,
            name: form.name || 'anonymous',
            message: form.message || 'your message will appear here',
            createdAt: date
        }"
    />
</template>

<script setup lang="ts">
import GuestbookEntry from '@client/components/GuestbookEntry.vue';
import { useMutation } from '@client/composables/useMutation';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { Icon } from '@iconify/vue';
import { formFieldDesc, formFieldLabel, formFieldOptional, formFieldRequired, outline, subHeading } from '@lib/classes';
import { CATPPUCCIN_MACCHIATO_COLORS } from '@lib/consts';
import { isValidEmail } from '@lib/helpers';
import type { GuestbookPayload } from '@lib/types';
import { computed, reactive, ref } from 'vue';

const date = new Date().toISOString();
const formField = 'block w-full bg-ctp-base border-none rounded-sm placeholder-ctp-subtext0 text-ctp-text';
const { mutating, mutate, mutationError } = useMutation<GuestbookPayload>('guestbook');
const justSent = ref(false);

const form = reactive<GuestbookPayload>({
    name: '',
    message: '',
    email: '',
    url: '',
    borderColor: 'pink'
});

const errors = reactive({
    message: '',
    email: '',
    url: ''
});

const hasErrors = computed(() => Object.values(errors).some(x => x !== null && x !== ''));

const submit = async () => {
    Object.assign(errors, { name: '', message: '', email: '' });

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

    if (hasErrors.value) {
        return;
    }

    const payload: GuestbookPayload = {
        name: form.name || 'anonymous',
        message: form.message,
        borderColor: form.borderColor ?? 'pink',
        ...(form.url && { url: form.url }),
        ...(form.email && { email: form.email })
    };

    const ok = await mutate(payload);

    if (ok) {
        justSent.value = true;
        setTimeout(() => (window.location.href = '/guestbook'), 3000);
    }
};
</script>
