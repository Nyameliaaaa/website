<template>
    <AsyncState :loading="loading" :error="error" :empty="data?.length === 0">
        <Paginator v-if="data" :items="data">
            <template #default="{ item }">
                <div
                    class="bg-ctp-base py-2 px-4 border-2 border-ctp-crust rounded-lg flex flex-col md:flex-row items-center justify-between my-3"
                >
                    <p :class="leadText">{{ item.text }}</p>
                    <p :class="[caption, 'text-right']">
                        <time :datetime="item.createdAt">
                            {{
                                new Date(item.createdAt)
                                    .toLocaleDateString('en-us', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })
                                    .toLowerCase()
                            }}
                        </time>
                    </p>
                </div>
            </template></Paginator
        >
    </AsyncState>
</template>

<script setup lang="ts">
const props = defineProps<{
    limitItems?: boolean;
}>();

import AsyncState from '@client/components/AsyncState.vue';
import Paginator from '@client/components/Paginator.vue';
import { useWorker } from '@client/composables/useWorker';
import { body, caption, leadText, link } from '@lib/classes';
import type { StatusItem } from '@lib/types';
import { onMounted } from 'vue';

const { loading, error, data, useFetch } = useWorker<StatusItem[]>();

onMounted(() => useFetch('statuses'));
</script>
