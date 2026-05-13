<template>
    <div v-if="headings.length" class="w-full px-4 pt-4 xl:sticky xl:top-4">
        <div class="mx-auto w-full max-w-md rounded-lg bg-ctp-mantle border-2 border-ctp-pink">
            <Disclosure v-slot="{ open }">
                <DisclosureButton
                    :class="[
                        'flex w-full justify-between items-center px-2 py-2 text-left text-ctp-crust font-medium bg-ctp-pink cursor-pointer',
                        outline.replace('rounded-lg ', '')
                    ]"
                >
                    <div class="flex gap-2 items-center">
                        <Icon icon="mdi:table-of-contents" class="text-ctp-crust" size="24" />
                        <p class="text-ctp-crust font-semibold">table of contents</p>
                    </div>

                    <Icon
                        icon="mdi:chevron-down"
                        :class="['transition-all duration-300 text-ctp-crust', open ? 'rotate-180' : 'rotate-0']"
                        size="16"
                        id="toc-chevron"
                    />
                </DisclosureButton>
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
                    <DisclosurePanel :class="['p-4 bg-ctp-mantle max-h-128 overflow-y-scroll', outline]">
                        <ul>
                            <li v-for="(heading, i) in headings" :key="i">
                                <a
                                    :href="`#${heading.slug}`"
                                    :class="[body, link]"
                                    :style="{
                                        marginLeft: `calc(2rem * ${hasH1 ? heading.depth - 1 : heading.depth - 2})`
                                    }"
                                >
                                    {{ heading.text === 'Footnotes' ? heading.text.toLowerCase() : heading.text }}
                                </a>
                            </li>
                        </ul>
                    </DisclosurePanel>
                </Transition>
            </Disclosure>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Icon } from '@iconify/vue';
import { body, link, outline } from '@lib/classes';
import type { MarkdownHeading } from 'astro';
import { Transition } from 'vue';

const props = defineProps<{ headings: MarkdownHeading[] }>();
const hasH1 = props.headings.filter(heading => heading.depth === 1).length > 0;
</script>
