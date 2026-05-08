import { WORKERS_URL } from '@lib/consts';
import { ref } from 'vue';

export const useWorker = <T>() => {
    const data = ref<T | null>(null);
    const loading = ref(true);
    const error = ref(false);

    const useFetch = async (endpoint: string, handleData: (data: T) => T = data => data) => {
        if (!loading.value) {
            loading.value = true;
        }

        if (data.value) {
            data.value = null;
        }

        try {
            const res = await fetch(`${WORKERS_URL}/${endpoint}`);
            const json = await res.json();

            if (!res.ok) {
                console.error(json);
                error.value = true;
            }

            data.value = handleData(json as T);
        } catch (e) {
            console.error(e);
            error.value = true;
        } finally {
            loading.value = false;
        }
    };

    return { data, loading, error, useFetch };
};
