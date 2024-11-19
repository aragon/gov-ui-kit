import { useFormContext as useFormContextApi, type UseFormReturn } from 'react-hook-form';

export type IUseFormContextReturn = UseFormReturn;

export const useFormContext = (): IUseFormContextReturn => {
    // Fallback to empty object to avoid requiring a react-hook-form wrapper on read-only mode
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const context = useFormContextApi() ?? {};

    return context;
};
