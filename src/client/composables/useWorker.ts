import { WORKERS_URL } from '@lib/consts';
import { ref } from 'vue';

type InnerFetchOptions<T> = Partial<{
    handler: (data: T) => T;
}>;

export const useWorker = <T>(endpoint: string) => {
    const data = ref<T | null>(null);
    const loading = ref(true);
    const error = ref(false);

    const useFetch = async (options: InnerFetchOptions<T> = {}) => {
        const { handler = d => d } = options;

        if (!loading.value) {
            loading.value = true;
        }

        try {
            const res = await fetch(`${WORKERS_URL}/${endpoint}`);
            const json = await res.json();

            if (!res.ok) {
                console.error(json);
                error.value = true;
            }

            data.value = handler(json as T);
        } catch (e) {
            console.error(e);
            error.value = true;
        } finally {
            loading.value = false;
        }
    };

    return { data, loading, error, useFetch };
};
