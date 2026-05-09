<template>
    <button
        @click="() => $emit('submit')"
        :class="[
            'transition-all duration-300',
            'py-1 px-5 rounded-sm text-ctp-subtext0',
            outline,
            {
                'bg-ctp-base hover:bg-ctp-pink hover:text-ctp-crust cursor-pointer': !isMutating && !mutationError,
                'bg-ctp-crust': isMutating ?? mutationError
            }
        ]"
        :disabled="isMutating ?? mutationError"
        id="submit"
        aria-describedby="submit-desc"
    >
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
            <div v-if="isMutating" class="flex flex-row items-center gap-2">
                <Icon icon="mdi:loading" class="animate-spin" size="20" />
                <p>{{ loadingText }}</p>
            </div>
            <p v-else>{{ actionText }}</p>
        </TransitionGroup>
    </button>

    <Transition
        tag="div"
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
    >
        <p :class="[formFieldDesc, 'mt-1']" id="submit-desc">
            <span v-if="justMutated" class="text-ctp-green">{{ doneText }}</span>
            <span v-else-if="mutationError" class="text-ctp-maroon">something went wrong!</span>
            <span v-else-if="hasErrors" class="text-ctp-maroon">check the fields and try again!</span>
        </p>
    </Transition>
</template>

<script setup lang="ts">
import { Transition, TransitionGroup } from 'vue';
import { formFieldDesc, outline } from '@lib/classes';
import { Icon } from '@iconify/vue';

defineProps<{
    justMutated: boolean;
    mutationError: boolean;
    hasErrors: boolean;
    isMutating: boolean;
    loadingText: string;
    actionText: string;
    doneText: string;
}>();
defineEmits<{ (e: 'submit'): void }>();
</script>
