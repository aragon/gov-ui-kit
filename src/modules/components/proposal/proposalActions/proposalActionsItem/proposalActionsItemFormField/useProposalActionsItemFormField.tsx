import { type ChangeEvent, type FocusEvent, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { addressUtils } from '../../../../../utils';
import { proposalActionsItemFormFieldUtils } from './proposalActionsItemFormFieldUtils';
import type {
    IUseProposalActionsItemFormFieldParams,
    IUseProposalActionsItemFormFieldReturn,
    ProposalActionFieldState,
} from './useProposalActionsItemFormField.api';

export const useProposalActionsItemFormField = (name: string, params: IUseProposalActionsItemFormFieldParams) => {
    const { label, formPrefix, editMode, value, required, type } = params;

    // Use React ref to avoid calling register conditionally
    const editModeRef = useRef(editMode);

    // Fallback to empty object to avoid requiring a react-hook-form wrapper on read-only mode
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const { register, getFieldState } = useFormContext() ?? {};

    const [fieldState, setFieldState] = useState<ProposalActionFieldState>();

    const fieldName = formPrefix != null ? `${formPrefix}.${name}` : name;

    const validateFunction = (value: string) => {
        if (type === 'boolean') {
            return (
                proposalActionsItemFormFieldUtils.validateBoolean(value) || `${label} must be set to "true" or "false"`
            );
        } else if (type === 'address') {
            return addressUtils.isAddress(value) || `${label} is not a valid address`;
        }

        return undefined;
    };

    const validationRules = {
        required: required ? `${label} is required.` : undefined,
        validate: validateFunction,
    };

    // Use React ref to avoid calling register conditionally
    const { onChange, onBlur, ...valueField }: IUseProposalActionsItemFormFieldReturn = editModeRef.current
        ? register(fieldName, {
              ...validationRules,
              setValueAs: (value: string) => proposalActionsItemFormFieldUtils.valueSetter(value, type),
          })
        : proposalActionsItemFormFieldUtils.getDefaultFormField(fieldName, value);

    const handleFieldChange = async (event: ChangeEvent): Promise<void> => {
        await onChange(event);
        setFieldState(getFieldState(fieldName));
    };

    const handleFieldBlur = async (event: FocusEvent): Promise<void> => {
        await onBlur(event);
        setFieldState(getFieldState(fieldName));
    };

    const alert = proposalActionsItemFormFieldUtils.fieldErrorToAlert(fieldState?.error);
    const inputType = type === 'number' ? 'number' : 'text';

    return {
        ...valueField,
        onChange: handleFieldChange,
        onBlur: handleFieldBlur,
        label,
        disabled: !editMode,
        alert,
        type: inputType,
    };
};
