<template>
    <div
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        role="region"
        @click.self="activeItem = null"
    >
        <a
            v-for="(item, index) in data"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
                'group relative block aspect-square overflow-hidden rounded-md transition duration-300 border-2 border-transparent hover:border-ctp-pink focus:outline-none focus:ring-2 focus:ring-ctp-pink focus:ring-offset-ctp-base',
                activeItem === `${index}/${item.url}` ? 'is-active' : ''
            ]"
            :aria-label="$emit('aria', item)"
            @click="handleClick($event, item.url, index)"
        >
            <img
                v-if="item.image"
                :src="item.image"
                :alt="`${item.name} by ${item.artist}`"
                class="h-full w-full object-cover transition duration-300 group-hover:opacity-90 group-[.is-active]:opacity-90 group-hover:blur-sm bg-ctp-crust"
                loading="lazy"
            />
            <div
                class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-ctp-mantle/60 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100"
            >
                <p class="line-clamp-2 w-full text-xl font-bold text-ctp-text">{{ item.name }}</p>
                <p class="w-full text-base text-ctp-text">{{ item.artist }}</p>
                <template v-if="'playcount' in item">
                    <p class="text-sm text-ctp-subtext1">{{ item.playcount }} plays</p>
                </template>
            </div>
        </a>
    </div>
</template>

<script setup lang="ts">
import type { Album, Recent } from '@/types';
import { onUnmounted, ref } from 'vue';

defineProps<{ data: (Recent | Album)[] }>();
defineEmits<{ (e: 'aria', item: Recent | Album): string }>();

const activeItem = ref<string | null>(null);
let timeout: ReturnType<typeof setTimeout>;

const handleClick = (e: MouseEvent, url: string, index: number) => {
    if (activeItem.value !== `${index}/${url}`) {
        e.preventDefault();
        clearTimeout(timeout);

        activeItem.value = `${index}/${url}`;

        timeout = setTimeout(() => {
            activeItem.value = null;
        }, 3000);
    } else {
        activeItem.value = null;
    }
};

onUnmounted(() => clearTimeout(timeout));
</script>
