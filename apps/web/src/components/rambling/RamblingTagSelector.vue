<template>
	<Listbox v-model="selected" @update:model-value="navigate" v-slot="{ open }">
		<div class="relative">
			<ListboxButton
				id="tag-select"
				:class="['formField relative cursor-pointer py-2 pr-10 pl-3 text-left', outlineLg]"
			>
				<span class="text-ctp-text block truncate">{{ tags.find(x => x.value === selected)?.label }}</span>
				<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
					<Icon
						icon="mdi:chevron-down"
						:class="['text-ctp-text transition-all duration-300', open ? 'rotate-180' : 'rotate-0']"
						size="28"
					/>
				</span>
			</ListboxButton>

			<Transition
				enter-active-class="transition-opacity duration-200"
				enter-from-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="transition-opacity duration-200"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<ListboxOptions
					class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none"
				>
					<ListboxOption v-for="item in tags" :key="item.label" :value="item.value" v-slot="{ selected }" as="template">
						<li
							:class="[
								'relative py-2 pr-10 pl-3 select-none',
								{
									'bg-ctp-surface0 text-ctp-pink': selected,
									'bg-ctp-base hover:bg-ctp-mantle text-ctp-text cursor-pointer': !selected,
								},
							]"
						>
							<span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
								{{ item.label }}
							</span>
						</li>
					</ListboxOption>
				</ListboxOptions>
			</Transition>
		</div>
	</Listbox>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { Icon } from '@iconify/vue';
import { outlineLg } from '@lib/classes';
import { navigate } from 'astro:transitions/client';
import { ref } from 'vue';

const props = defineProps<{
	current?: string;
	tags: { label: string; value: string }[];
}>();

const selected = ref(props.current ?? '');
</script>
