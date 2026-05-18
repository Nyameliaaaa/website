import { computed, onUnmounted, reactive, ref } from 'vue';

export const useSubmitHelpers = <Form extends Record<any, any>, Errors extends Record<any, any>>(
	formObj: Form,
	errorsObj: Errors
) => {
	const isMutating = ref(false);
	const justMutated = ref(false);

	const originalForm = { ...formObj };
	const originalErrors = { ...errorsObj };

	const form = reactive(formObj);
	const errors = reactive(errorsObj);
	const hasErrors = computed(() => Object.values(errors).some(x => x !== null && x !== ''));

	const resetForm = () => {
		Object.assign(form, originalForm);
	};

	const resetErrors = () => {
		Object.assign(errors, originalErrors);
	};

	const useSubmitWrap = (
		handleErrors: () => Promise<void>,
		handleMutate: () => Promise<boolean>,
		handleOk: () => Promise<void>,
		handleFail?: () => Promise<void>
	) => {
		return async () => {
			justMutated.value = false;
			isMutating.value = true;
			resetErrors();

			await handleErrors();

			if (hasErrors.value) {
				isMutating.value = false;
				return;
			}

			const ok = await handleMutate();

			if (ok) {
				isMutating.value = false;
				justMutated.value = true;
				await handleOk();
			} else {
				isMutating.value = false;
				await handleFail?.();
			}
		};
	};

	onUnmounted(() => {
		justMutated.value = false;
	});

	return { isMutating, form, errors, hasErrors, justMutated, resetForm, resetErrors, useSubmitWrap };
};
