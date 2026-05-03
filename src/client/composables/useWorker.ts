import { WORKERS_URL } from '@/consts';
import { ref } from 'vue';

export const useWorker = <T>() => {
    const data = ref<T | null>(null);
    const loading = ref(true);
    const error = ref(false);

    const useFetch = async (endpoint: string, handleData: (data: T) => T = data => data) => {
        loading.value = true;

        try {
            const res = await fetch(`${WORKERS_URL}/${endpoint}`);
            const json = await res.json();

            data.value = handleData(json as T);
        } catch (e) {
            error.value = true;
        } finally {
            loading.value = false;
        }
    };

    return { data, loading, error, useFetch };
};
