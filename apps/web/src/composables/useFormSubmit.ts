import { ref } from 'vue';

type MutationStatus = 'idle' | 'success' | 'error';

export const useFormSubmit = <TValues>(
	mutate: (values: TValues) => Promise<boolean>,
	options?: {
		onSuccess?: () => Promise<void> | void;
		onError?: () => Promise<void> | void;
	}
) => {
	const status = ref<MutationStatus>('idle');

	const execute = async (values: TValues) => {
		status.value = 'idle';

		try {
			const ok = await mutate(values);

			if (!ok) {
				status.value = 'error';
				await options?.onError?.();
				return;
			}

			status.value = 'success';
			await options?.onSuccess?.();
		} catch {
			status.value = 'error';
			await options?.onError?.();
		}
	};

	return {
		status,
		execute,
	};
};
