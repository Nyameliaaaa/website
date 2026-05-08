<template>
    <div class="bg-ctp-base rounded-sm p-2 mb-2 w-full">
        <div class="flex flex-row justify-between">
            <p :class="caption">{{ entry.name }}</p>
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
        </div>
        <p :class="leadText">{{ entry.message }}</p>
    </div>
</template>

<script setup lang="ts">
import { caption, leadText } from '@lib/classes';
import type { GuestbookItem } from '@lib/types';

defineProps<{
    entry: GuestbookItem;
}>();
</script>
