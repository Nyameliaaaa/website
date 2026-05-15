<template>
	<div class="w-full">
		<Listbox v-model="model" v-slot="{ open }">
			<div class="relative mt-1">
				<div>
					<label :class="[formFieldLabel, 'mb-1']" for="colors">color <span :class="formFieldRequired">*</span></label>
					<ListboxButton
						:class="['cursor-pinter relative cursor-default py-2 pr-10 pl-3 text-left', formField, outline]"
						id="colors"
					>
						<span class="block truncate" :style="{ color: `var(--catppuccin-color-${model})` }">{{ model }}</span>
						<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<Icon
								icon="mdi:chevron-down"
								:class="['text-ctp-text transition-all duration-300', open ? 'rotate-180' : 'rotate-0']"
								size="28"
								id="toc-chevron"
							/>
						</span>
					</ListboxButton>
				</div>

				<transition
					enter-active-class="transition-opacity duration-200"
					enter-from-class="opacity-0"
					enter-to-class="opacity-100"
					leave-active-class="transition-opacity duration-200"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
					mode="out-in"
				>
					<ListboxOptions
						class="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none"
					>
						<ListboxOption
							v-slot="{ selected }"
							v-for="(color, i) in CATPPUCCIN_MACCHIATO_COLORS"
							:key="i"
							:value="color"
							as="template"
						>
							<li
								:class="[
									'relative py-2 pr-10 pl-3 select-none',
									{
										'bg-ctp-surface0': selected,
										'bg-ctp-base hover:bg-ctp-mantle cursor-pointer': !selected,
									},
								]"
								:style="{ color: `var(--catppuccin-color-${color})` }"
							>
								<span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
									{{ color }}
								</span>
							</li>
						</ListboxOption>
					</ListboxOptions>
				</transition>
			</div>
		</Listbox>
	</div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { Icon } from '@iconify/vue';
import { formField, formFieldLabel, formFieldRequired, outline } from '@lib/classes';
import { CATPPUCCIN_MACCHIATO_COLORS } from '@lib/consts';
import type { IsNullable } from '@website/lib';

const model = defineModel<IsNullable<string>>();
</script>
