<template>
    <div>
        <TransitionGroup
            tag="div"
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            mode="out-in"
        >
            <p v-if="loading" class="text-ctp-subtext0 font-semibold text-center">loading {{ '<3' }}</p>
            <p v-if="error" class="text-ctp-subtext0 font-semibold text-center">something went wrong {{ '<\/3' }}</p>
            <div v-if="data">
                <p v-if="data.length === 0" class="text-ctp-subtext0 font-semibold text-center">
                    no entries {{ '<\/3' }}
                </p>
                <template v-else>
                    <div
                        class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                        role="region"
                        @click.self="active = null"
                    >
                        <a
                            v-for="track in data"
                            :href="track.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :class="[
                                'group relative block aspect-square overflow-hidden rounded-md transition duration-300 border-2 border-transparent hover:border-ctp-pink focus:outline-none focus:ring-2 focus:ring-ctp-pink focus:ring-offset-ctp-base',
                                active === track.url ? 'is-active' : ''
                            ]"
                            :aria-label="`${track.name} by ${track.artist}`"
                        >
                            <img
                                v-if="track.image"
                                :src="track.image"
                                :alt="`${track.name} by ${track.artist}`"
                                class="h-full w-full object-cover transition duration-300 group-hover:opacity-90 group-[.is-active]:opacity-90 group-hover:blur-sm bg-ctp-crust"
                                loading="lazy"
                            />
                            <div
                                class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-ctp-mantle/60 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100"
                            >
                                <p class="line-clamp-2 w-full text-xl font-bold text-ctp-text">{{ track.name }}</p>
                                <p class="w-full text-base text-ctp-text">{{ track.artist }}</p>
                            </div>
                        </a>
                    </div>
                </template>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import type { Recent } from '@/types';
import { onMounted, ref, TransitionGroup } from 'vue';

const props = defineProps<{
    preview?: boolean;
}>();

const active = ref<string | null>(null);

const handleClick = (e: MouseEvent, url: string) => {
    if (active.value !== url) {
        e.preventDefault();
        active.value = url;
    }
};

const WORKERS_URL = 'https://nyamelia-services.nightlake.workers.dev/api';
const data = ref<Recent[] | null>(null);
const loading = ref(false);
const error = ref(false);

const fetchEntries = async () => {
    loading.value = true;
    try {
        const res = await fetch(`${WORKERS_URL}/lastfm/recent`);
        const json = (await res.json()) as Recent[];

        data.value = props.preview ? json.slice(0, 5) : json;
    } catch (e) {
        console.log(e);
        error.value = true;
    } finally {
        loading.value = false;
    }
};

onMounted(fetchEntries);
</script>
