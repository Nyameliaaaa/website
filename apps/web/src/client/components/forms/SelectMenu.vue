<template>
	<div class="w-full">
		<Listbox v-model="value" @update:model-value="handleChange">
			<div class="relative mt-1">
				<label :class="formFieldLabel" :for="name">
					{{ label }}
					<span v-if="required" :class="formFieldRequired">*</span>
					<span v-else :class="formFieldOptional">(optional)</span>
				</label>

				<p :id="`${name}-description`" :class="formFieldDesc">
					<span v-if="description">
						{{ description }}
					</span>
				</p>

				<ListboxButton
					:id="name"
					:class="['relative cursor-pointer py-2 pr-10 pl-3 text-left', formField, outline]"
					:aria-invalid="!!errorMessage"
					:aria-describedby="`${name}-description`"
				>
					<span class="text-ctp-text block truncate"
						><slot name="selected" :value="value">{{ value }}</slot></span
					>

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
						<ListboxOption
							v-for="item in options"
							:key="item.label"
							:value="item.value"
							v-slot="{ selected }"
							as="template"
						>
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
									<slot name="option" :option="item" :selected="selected">
										{{ item.label }}
									</slot>
								</span>
							</li>
						</ListboxOption>
					</ListboxOptions>
				</Transition>
			</div>
		</Listbox>

		<p :id="`${name}-description`" :class="formFieldDesc">
			<span v-if="errorMessage" class="text-ctp-maroon">
				{{ errorMessage }}
			</span>
		</p>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { Icon } from '@iconify/vue';
import { formField, formFieldLabel, formFieldDesc, formFieldRequired, outline, formFieldOptional } from '@lib/classes';
import { CATPPUCCIN_MACCHIATO_COLORS } from '@website/lib';
import { useField } from 'vee-validate';

const props = defineProps<{
	name: string;
	label: string;
	description?: string;
	required?: boolean;
	options: { label: string; value: string }[];
}>();

const { value, errorMessage, handleChange } = useField<string>(() => props.name);

const open = computed(() => false);
</script>
