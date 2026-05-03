<template>
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
        <p v-if="loading" :class="[text, minHeightAndSize ?? '']">loading {{ '<3' }}</p>
        <p v-else-if="error" :class="[text, minHeightAndSize ?? '']">something went wrong {{ '<\/3' }}</p>
        <p v-else-if="empty" :class="[text, minHeightAndSize ?? '']">no entries {{ '<\/3' }}</p>
        <slot v-else />
    </TransitionGroup>
</template>

<script setup lang="ts">
import { TransitionGroup } from 'vue';

defineProps<{
    loading: boolean;
    error: boolean;
    empty?: boolean;
    minHeightAndSize?: string;
}>();

const text = 'text-ctp-subtext0 font-semibold text-center';
</script>
