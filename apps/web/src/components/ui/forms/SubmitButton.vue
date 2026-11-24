<template>
	<div class="flex flex-row gap-2">
		<button
			type="submit"
			:class="[
				'transition-all duration-300',
				'text-ctp-subtext0 rounded-lg px-5 py-1',
				outlineLg,
				{
					'bg-ctp-base hover:bg-ctp-pink hover:text-ctp-crust cursor-pointer': !isSubmitting,
					'bg-ctp-crust': isSubmitting,
				},
			]"
			:disabled="isSubmitting"
			id="submit"
			aria-describedby="submit-desc"
		>
			<Transition mode="out-in">
				<div v-if="isSubmitting" class="flex flex-row items-center gap-2">
					<Icon icon="mdi:loading" class="animate-spin" size="20" />
					<p>{{ loadingText }}</p>
				</div>
				<p v-else>{{ actionText }}</p>
			</Transition>
		</button>

		<Transition mode="out-in">
			<p :class="[formFieldDesc, 'mt-1']" id="submit-desc">
				<span v-if="mutationStatus === 'success'" class="text-ctp-green">
					{{ doneText }}
				</span>
				<span v-else-if="mutationStatus === 'error'" class="text-ctp-maroon"> something went wrong! </span>
				<span v-else-if="submitCount > 0 && Object.keys(errors).length" class="text-ctp-maroon">
					check the fields and try again!
				</span>
			</p>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { useFormContext } from 'vee-validate';
import { formFieldDesc, outlineLg } from '@lib/classes';
import { Icon } from '@iconify/vue';

defineProps<{
	loadingText: string;
	actionText: string;
	doneText: string;
	mutationStatus: 'idle' | 'success' | 'error';
}>();

const { isSubmitting, errors, submitCount } = useFormContext();
</script>
