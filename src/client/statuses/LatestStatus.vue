<template>
    <AsyncState :loading="loading" :error="error" :empty="false" static>
        <div
            v-if="data"
            class="bg-ctp-crust py-2 px-4 border-2 border-dashed border-ctp-base rounded-lg flex flex-col md:flex-row md:items-center md:justify-between"
        >
            <p :class="leadText">{{ data.text }}</p>
            <p :class="[caption, 'text-right']">
                <time :datetime="data.createdAt">
                    {{
                        new Date(data.createdAt)
                            .toLocaleDateString('en-us', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })
                            .toLowerCase()
                    }}
                </time>
                <span> • </span>
                <a href="/statuses" :class="link">see all statuses</a>
            </p>
        </div>
    </AsyncState>
</template>

<script setup lang="ts">
const props = defineProps<{
    limitItems?: boolean;
}>();

import AsyncState from '@client/components/AsyncState.vue';
import { useWorker } from '@client/composables/useWorker';
import { body, caption, leadText, link } from '@lib/classes';
import type { StatusItem } from '@lib/types';
import { onMounted } from 'vue';

const { loading, error, data, useFetch } = useWorker<StatusItem>('statuses/latest');

onMounted(() => useFetch());
</script>
