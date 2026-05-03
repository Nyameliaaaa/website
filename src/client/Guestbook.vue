<template>
    <div :class="{ ['grid grid-cols-1 gap-3 lg:grid-cols-5']: isHomepage }">
        <div class="col-span-2">
            <label class="text-ctp-subtext0 font-semibold" for="name">name</label>
            <input
                class="block w-full bg-ctp-base border-none mb-2 rounded-sm focus:ring-2 focus:ring-ctp-pink placeholder-ctp-subtext1 text-ctp-text"
                v-model="form.name"
                placeholder="anonymous"
                id="name"
            />

            <label class="text-ctp-subtext0 font-semibold" for="message"
                >message <span class="text-ctp-pink">*</span></label
            >
            <textarea
                class="block w-full h-20 resize-none bg-ctp-base border-none mb-2 rounded-sm focus:ring-2 focus:ring-ctp-pink placeholder-ctp-subtext1 text-ctp-text"
                v-model="form.message"
                placeholder="dont be a meanie ^^"
                required="true"
                minlength="1"
                id="message"
            />

            <label class="text-ctp-subtext0 font-semibold" for="email">email</label>
            <p class="text-ctp-subtext1">only visible to amelia, u dont have to include this :p</p>
            <input
                class="block w-full bg-ctp-base border-none mb-2 rounded-sm focus:ring-2 focus:ring-ctp-pink placeholder-ctp-subtext1 text-ctp-text"
                v-model="form.email"
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
            <AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
                <div v-for="entry in data" class="bg-ctp-base rounded-sm p-2 mb-2 w-full">
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

                <IconLink v-if="isHomepage" url="/guestbook" icon="arrow-right" text="see all entries" />
            </AsyncState>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    isHomepage: boolean;
}>();

import { WORKERS_URL } from '@/consts';
import AsyncState from '@client/components/AsyncState.vue';
import { useWorker } from '@/client/composables/useWorker';
import IconLink from '@client/components/VueIconLink.vue';
import { onMounted, reactive } from 'vue';

interface GuestbookEntry {
    name: string;
    message: string;
    createdAt: string;
}

const { loading, error, data, useFetch } = useWorker<GuestbookEntry[]>();
const handler = (data: GuestbookEntry[]) => (props.isHomepage ? data.slice(0, 5) : data);

const form = reactive({
    name: '',
    message: '',
    email: ''
});

const submit = async () => {
    const payload = {
        name: form.name || 'anonymous',
        message: form.message,
        ...(form.email && { email: form.email })
    };

    await fetch(`${WORKERS_URL}/guestbook`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    Object.assign(form, { name: '', message: '', email: '' });

    data.value = null;
    await useFetch('guestbook', handler);
};

onMounted(() => useFetch('guestbook', handler));
</script>
