import type { UseFormGetFieldState, UseFormRegisterReturn } from 'react-hook-form';

export type ProposalActionFieldType = 'string' | 'address' | 'number' | 'boolean';

export type ProposalActionFieldState = ReturnType<UseFormGetFieldState<Record<string, string>>>;

export interface IUseProposalActionsItemFormFieldParams {
    /**
     * Label of the field used for validation messages.
     */
    label: string;
    /**
     * Form prefix to be prepended to the field name.
     */
    formPrefix?: string;
    /**
     * Uses the react-hook-form utilities to register the field when set to true. Does not use the react-hook-form
     * utilities otherwise to allow using the library without a form-context when edit-mode is not set or set to false.
     */
    editMode?: boolean;
    /**
     * Initial value of the field.
     */
    value: string;
    /**
     * Marks the field as required when set to true.
     */
    required?: boolean;
    /**
     * Value type to set correct validation rules for the input field.
     */
    type: ProposalActionFieldType;
}

export interface IUseProposalActionsItemFormFieldReturn extends UseFormRegisterReturn {
    /**
     * Value of the field.
     */
    value?: string;
}
