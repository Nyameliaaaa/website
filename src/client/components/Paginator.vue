<template>
    <div>
        <div v-for="(item, i) in paginated" :key="i">
            <slot :item="item" />
        </div>

        <div v-if="totalPages > 1" class="flex justify-center mt-2">
            <div
                class="flex flex-row items-center w-fit rounded-lg border-2 border-ctp-crust divide-x-2 divide-ctp-mantle overflow-hidden"
            >
                <button
                    :class="[
                        'p-2 text-ctp-subtext0 h-full',
                        {
                            'bg-ctp-base hover:text-ctp-subtext1 hover:bg-ctp-surface0 transition-all duration-300 cursor-pointer':
                                currentPage !== 1,
                            [outline]: currentPage !== 1,

                            'cursor-not-allowed bg-ctp-mantle': currentPage === 1
                        }
                    ]"
                    :disabled="currentPage === 1"
                    @click="currentPage--"
                >
                    <Icon icon="mdi:chevron-left" size="24" />
                </button>
                <span class="p-2 bg-ctp-base font-semibold text-ctp-text">{{ currentPage }} / {{ totalPages }}</span>
                <button
                    :class="[
                        'p-2 text-ctp-subtext0 h-full',
                        {
                            'bg-ctp-base hover:text-ctp-subtext1 hover:bg-ctp-surface0 transition-all duration-300 cursor-pointer':
                                currentPage !== totalPages,
                            [outline]: currentPage !== totalPages,
                            'cursor-not-allowed bg-ctp-mantle': currentPage === totalPages
                        }
                    ]"
                    :disabled="currentPage === totalPages"
                    @click="currentPage++"
                >
                    <Icon icon="mdi:chevron-right" size="24" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
const outline = 'focus-visible:outline-none focus-visible:bg-ctp-surface0';

const props = defineProps<{
    items: T[];
    perPage?: number;
}>();

const currentPage = ref(1);
const _perPage = props.perPage ?? 8;

const totalPages = computed(() => Math.ceil(props.items.length / _perPage));

const paginated = computed(() => {
    const start = (currentPage.value - 1) * _perPage;
    return props.items.slice(start, start + _perPage);
});
</script>
