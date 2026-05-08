<template>
    <div
        class="bg-ctp-base rounded-sm p-3 mb-2 w-full border-2"
        :style="{ borderColor: `var(--catppuccin-color-${entry.borderColor})` }"
    >
        <div class="flex flex-row justify-between items-center">
            <p :class="caption">{{ entry.name }}</p>
            <a
                v-if="entry.url"
                target="_blank"
                rel="noopener noreferrer"
                :class="[
                    'group flex flex-row gap-2 transition-all duration-300 items-center hover:text-ctp-pink',
                    outline,
                    'w-fit'
                ]"
                :href="entry.url"
            >
                <Icon icon="mdi:link-variant" :class="iconButton" size="16" />
            </a>
        </div>
        <div class="my-1">
            <p :class="leadText">{{ entry.message }}</p>
        </div>

        <div v-if="entry.ameliaReply" class="my-2 bg-ctp-mantle p-2 rounded-md">
            <div class="flex flex-row gap-2 items-center">
                <Icon icon="mdi:reply" :class="caption" size="24" />
                <p :class="caption">amelia replied</p>
            </div>
            <p :class="leadText">{{ entry.ameliaReply }}</p>
        </div>

        <div class="flex flex-row justify-between items-center">
            <time :class="caption" :datetime="entry.createdAt">
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
            <a
                v-if="entry.id"
                :class="[
                    'group flex flex-row gap-2 transition-all duration-300 items-center hover:text-ctp-pink',
                    outline,
                    'w-fit'
                ]"
                :href="`/guestbook/report?id=${entry.id}`"
            >
                <Icon icon="mdi:flag" :class="iconButton" size="16" />
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { caption, iconButton, leadText, outline } from '@lib/classes';
import type { GuestbookItem } from '@lib/types';

defineProps<{
    entry: GuestbookItem;
}>();
</script>
