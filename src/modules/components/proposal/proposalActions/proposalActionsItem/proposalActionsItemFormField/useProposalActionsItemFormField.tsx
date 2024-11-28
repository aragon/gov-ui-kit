import { type ChangeEvent, type FocusEvent, useRef, useState } from 'react';
import { useFormContext } from '../../../../../hooks';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import { proposalActionsItemFormFieldUtils } from './proposalActionsItemFormFieldUtils';
import type {
    IUseProposalActionsItemFormFieldParams,
    IUseProposalActionsItemFormFieldReturn,
    ProposalActionFieldState,
} from './useProposalActionsItemFormField.api';

export const useProposalActionsItemFormField = (name: string, params: IUseProposalActionsItemFormFieldParams) => {
    const { label, formPrefix, editMode = false, value, required, type } = params;

    // Use React ref to avoid triggering register-form-field functionality conditionally
    const editModeRef = useRef(editMode);

    const { copy } = useGukModulesContext();
    const { register, getFieldState } = useFormContext(editMode);

    const [fieldState, setFieldState] = useState<ProposalActionFieldState>();

    const fieldName = formPrefix != null ? `${formPrefix}.${name}` : name;

    const errorMessages = copy.proposalActionsItemFormField;
    const validationRules = proposalActionsItemFormFieldUtils.getValidationRules({
        label,
        type,
        required,
        errorMessages,
    });

    const { onChange, onBlur, ...valueField }: IUseProposalActionsItemFormFieldReturn = editModeRef.current
        ? register(fieldName, {
              ...validationRules,
              setValueAs: (value?: string | boolean | null) =>
                  proposalActionsItemFormFieldUtils.valueSetter(value, type),
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
