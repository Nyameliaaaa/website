import { WORKERS_URL } from '@lib/consts';
import { ref } from 'vue';

export const useMutation = <TBody>(endpoint: string) => {
    const mutating = ref(false);
    const mutationError = ref(false);

    const mutate = async (body: TBody) => {
        mutating.value = true;
        mutationError.value = false;

        try {
            const res = await fetch(`${WORKERS_URL}/${endpoint}`, {
                method: 'POST',
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                console.error(await res.json());
                mutationError.value = true;
            }
        } catch (e) {
            console.error(e);
            mutationError.value = true;
        } finally {
            mutating.value = false;
        }

        return !mutationError.value;
    };

    return { mutating, mutationError, mutate };
};
