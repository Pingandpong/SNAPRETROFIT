import { useState, useCallback } from 'react';

interface AsyncState<T> {
    loading: boolean;
    error: Error | null;
    value: T | null;
}

export function useAsync<T = any>(asyncFunction: (...args: any[]) => Promise<T>) {
    const [state, setState] = useState<AsyncState<T>>({
        loading: false,
        error: null,
        value: null,
    });

    const execute = useCallback(async (...args: any[]) => {
        setState({ loading: true, error: null, value: null });
        try {
            const response = await asyncFunction(...args);
            setState({ loading: false, error: null, value: response });
            return response;
        } catch (error) {
            setState({ loading: false, error: error as Error, value: null });
            throw error;
        }
    }, [asyncFunction]);

    return { ...state, execute };
}
