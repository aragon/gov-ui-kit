import type { ForwardedRef, MutableRefObject, RefCallback, RefObject } from 'react';

/**
 * Utility to merge multiple React refs, inspired by https://github.com/gregberge/react-merge-refs
 */
export const mergeRefs = <T = unknown>(
    refs: Array<RefObject<T> | ForwardedRef<T> | undefined | null>,
): RefCallback<T> => {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(value);
            } else if (ref != null && 'current' in ref) {
                (ref as MutableRefObject<T | null>).current = value;
            }
        });
    };
};
