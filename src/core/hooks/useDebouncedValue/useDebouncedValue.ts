import { useEffect, useRef, useState } from 'react';

export interface IUseDebouncedValueParams {
    /**
     * Debounce time period in milliseconds.
     * @default 500
     */
    delay?: number;
}

export type IUseDebouncedValueResult<TValue> = [
    /**
     * Debounced value.
     */
    TValue,
    /**
     * Setter for the debounced value.
     */
    (value: TValue) => void,
];

export const useDebouncedValue = <TValue>(
    value: TValue,
    params: IUseDebouncedValueParams = {},
): IUseDebouncedValueResult<TValue> => {
    const { delay } = params;

    const [debouncedValue, setDebouncedValue] = useState(value);

    const timeoutRef = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(timeoutRef.current);
    }, [value, delay]);

    return [debouncedValue, setDebouncedValue];
};
