<template>
    <div :class="{ ['grid grid-cols-1 gap-3 lg:grid-cols-5']: isHomepage }">
        <div class="col-span-2">
            <label class="text-ctp-subtext0 font-semibold" for="name">name</label>
            <input
                class="block w-full bg-ctp-base border-none mb-2 rounded-sm focus:ring-2 focus:ring-ctp-pink placeholder-ctp-subtext1 text-ctp-text"
                v-model="name"
                placeholder="anonymous"
                id="name"
            />

            <label class="text-ctp-subtext0 font-semibold" for="message"
                >message <span class="text-ctp-pink">*</span></label
            >
            <textarea
                class="block w-full h-20 resize-none bg-ctp-base border-none mb-2 rounded-sm focus:ring-2 focus:ring-ctp-pink placeholder-ctp-subtext1 text-ctp-text"
                v-model="message"
                placeholder="dont be a meanie ^^"
                required="true"
                minlength="1"
                id="message"
            />

            <label class="text-ctp-subtext0 font-semibold" for="email">email</label>
            <p class="text-ctp-subtext1">only visible to amelia, u dont have to include this :p</p>
            <input
                class="block w-full bg-ctp-base border-none mb-2 rounded-sm focus:ring-2 focus:ring-ctp-pink placeholder-ctp-subtext1 text-ctp-text"
                v-model="email"
                autocomplete="nope"
                placeholder="hi@example.com"
                type="email"
                id="email"
            />

            <button
                @click="submit"
                class="bg-ctp-base text-ctp-subtext0 transition-colors duration-500 hover:bg-ctp-pink hover:text-ctp-crust py-1 px-5 rounded-sm cursor-pointer"
            >
                sign :3
            </button>

            <hr v-if="!isHomepage" class="border-ctp-base my-2" />
        </div>
        <div class="col-span-3">
            <TransitionGroup
                enter-active-class="transition-opacity duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                mode="out-in"
            >
                <p v-if="loading" class="text-ctp-subtext0 font-semibold text-center">loading {{ '<3' }}</p>
                <p v-if="error" class="text-ctp-subtext0 font-semibold text-center">
                    something went wrong {{ '<\/3' }}
                </p>
                <div v-if="data">
                    <p v-if="data.entries.length === 0" class="text-ctp-subtext0 font-semibold text-center">
                        no entries {{ '<\/3' }}
                    </p>

                    <template v-for="entry in data.entries">
                        <div class="bg-ctp-base rounded-sm p-2 mb-2 w-full">
                            <div class="flex flex-row justify-between">
                                <p class="text-ctp-subtext1">{{ entry.name }}</p>
                                <time class="text-ctp-subtext1" :datetime="entry.createdAt">
                                    {{
                                        new Date(entry.createdAt)
                                            .toLocaleDateString('en-us', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                            .toLowerCase()
                                    }}
                                </time>
                            </div>
                            <p class="text-lg font-semibold">{{ entry.message }}</p>
                        </div>
                    </template>

                    <IconLink v-if="isHomepage" url="/guestbook" icon="arrow-right-thin" text="see all entries" />
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    isHomepage: boolean;
}>();

import { ref, onMounted, TransitionGroup } from 'vue';
import IconLink from './VueIconLink.vue';

interface GuestbookEntry {
    name: string;
    message: string;
    createdAt: string;
}

interface Out {
    name: string;
    message: string;
    email?: string;
}

const WORKERS_URL = 'https://nyamelia-services.nightlake.workers.dev/api';
const data = ref<{ entries: GuestbookEntry[] } | null>(null);
const loading = ref(false);
const error = ref(false);

const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
};

const fetchEntries = async () => {
    loading.value = true;
    try {
        const res = await fetch(`${WORKERS_URL}/guestbook`);
        const json = await res.json();

        console.log(props.isHomepage);
        console.log(json);

        if (props.isHomepage === true) {
            data.value = { entries: json.entries.slice(0, 5) };
        } else {
            console.log(json);
            data.value = json;
        }
    } catch (e) {
        error.value = true;
    } finally {
        loading.value = false;
    }
};

const name = ref('');
const message = ref('');
const email = ref('');

const submit = async () => {
    const json: Out = { name: name.value, message: message.value };

    if (name.value === '') {
        json.name = 'anonymous';
    }

    if (email.value) {
        json.email = email.value;
    }

    console.log(json);

    await fetch(`${WORKERS_URL}/guestbook`, {
        method: 'POST',
        body: JSON.stringify(json)
    });

    name.value = '';
    message.value = '';
    email.value = '';

    data.value = null;
    await fetchEntries();
};

onMounted(fetchEntries);
</script>
