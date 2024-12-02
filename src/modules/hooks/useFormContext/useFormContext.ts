import { type FieldValues, useFormContext as useFormContextApi, type UseFormReturn } from 'react-hook-form';
import { invariant } from '../../../core';

export type UseFormContextReturn<TFormValues extends FieldValues = FieldValues> = UseFormReturn<TFormValues>;

export const useFormContext = <TFormValues extends FieldValues>(
    enabled: boolean,
): UseFormContextReturn<TFormValues> => {
    // react-hook-form returns the values as undefined when the hook is not called inside a form context provider.
    const values = useFormContextApi<TFormValues>() as UseFormContextReturn<TFormValues> | undefined;

    invariant(!enabled || values != null, 'useFormContext: hook must be used inside a form context.');

    return values ?? ({} as UseFormContextReturn<TFormValues>);
};
