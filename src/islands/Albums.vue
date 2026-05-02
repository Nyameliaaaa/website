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
                            v-for="album in data"
                            :href="album.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :class="[
                                'group relative block aspect-square overflow-hidden rounded-md transition duration-300 border-2 border-transparent hover:border-ctp-pink focus:outline-none focus:ring-2 focus:ring-ctp-pink focus:ring-offset-ctp-base',
                                active === album.url ? 'is-active' : ''
                            ]"
                            :aria-label="`${album.name} by ${album.artist} — ${album.playcount} plays`"
                            @click="handleClick($event, album.url)"
                        >
                            <img
                                v-if="album.image"
                                :src="album.image"
                                :alt="`${album.name} by ${album.artist}`"
                                class="h-full w-full object-cover transition duration-300 group-hover:opacity-90 group-[.is-active]:opacity-90 group-hover:blur-sm bg-ctp-crust"
                                loading="lazy"
                            />
                            <div
                                class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-ctp-mantle/60 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100"
                            >
                                <p class="line-clamp-2 w-full text-xl font-bold text-ctp-text">{{ album.name }}</p>
                                <p class="w-full text-base text-ctp-text">{{ album.artist }}</p>
                                <p class="text-sm text-ctp-subtext1">{{ album.playcount }} plays</p>
                            </div>
                        </a>
                    </div>
                </template>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import type { Album } from '@/types';
import { onMounted, ref, TransitionGroup } from 'vue';

const WORKERS_URL = 'https://nyamelia-services.nightlake.workers.dev/api';
const data = ref<Album[] | null>(null);
const loading = ref(false);
const error = ref(false);

const active = ref<string | null>(null);

const handleClick = (e: MouseEvent, url: string) => {
    if (active.value !== url) {
        e.preventDefault();
        active.value = url;
    }
};

const fetchEntries = async () => {
    loading.value = true;
    try {
        const res = await fetch(`${WORKERS_URL}/lastfm/albums`);
        const json = (await res.json()) as Album[];

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
