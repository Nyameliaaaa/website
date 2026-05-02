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
                    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        <a
                            v-for="artist in data"
                            :href="artist.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group rounded-md transition p-2 duration-300 border-2 border-transparent hover:border-ctp-pink focus:outline-none focus:ring-2 focus:ring-ctp-pink bg-ctp-base"
                            :aria-label="artist.name"
                        >
                            <p class="line-clamp-2 w-full text-xl font-bold text-ctp-text">{{ artist.name }}</p>
                        </a>
                    </div>
                </template>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import type { Artist } from '@/types';
import { onMounted, ref, TransitionGroup } from 'vue';

const WORKERS_URL = 'https://nyamelia-services.nightlake.workers.dev/api';
const data = ref<Artist[] | null>(null);
const loading = ref(false);
const error = ref(false);

const fetchEntries = async () => {
    loading.value = true;
    try {
        const res = await fetch(`${WORKERS_URL}/lastfm/artists`);
        const json = (await res.json()) as Artist[];

        data.value = json;
    } catch (e) {
        console.log(e);
        error.value = true;
    } finally {
        loading.value = false;
    }
};

onMounted(fetchEntries);
</script>
