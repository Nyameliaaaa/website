<template>
    <div class="group flex flex-row gap-2 transition-all duration-400 items-center">
        <Icon
            :icon="`mdi:${icon}`"
            class="transition-all duration-400 text-ctp-subtext-0 group-hover:text-ctp-pink"
            size="16"
        />

        <a class="transition-all duration-400 text-ctp-subtext0 group-hover:text-ctp-pink" :href="url">{{ text }}</a>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
    url: string;
    icon: string;
    text: string;
}>();
</script>
