<template>
    <a
        :class="[
            'group flex flex-row gap-2 transition-all duration-300 items-center hover:text-ctp-pink',
            outline,
            'w-fit'
        ]"
        :href="url"
    >
        <Icon :icon="`mdi:${icon}`" :class="iconButton" size="16" />

        <p :class="iconButton">{{ text }}</p>
    </a>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { iconButton, outline } from '@lib/classes';

defineProps<{
    url: string;
    icon: string;
    text: string;
}>();
</script>
