import { type ChangeEvent, type FocusEvent, useRef, useState } from 'react';
import { addressUtils } from '../../utils';
import { useFormContext } from '../useFormContext';
import { formFieldUtils } from './formFieldUtils';
import type { IUseFormFieldParams, IUseFormFieldReturn, IUseFormFieldState } from './useFormField.api';

export const useFormField = (name: string, params: IUseFormFieldParams) => {
    const { label, formPrefix, editMode, value, required, type } = params;

    // Use React ref to avoid calling register conditionally
    const editModeRef = useRef(editMode);

    const { register, getFieldState } = useFormContext();

    const [fieldState, setFieldState] = useState<IUseFormFieldState>();

    const fieldName = formPrefix != null ? `${formPrefix}.${name}` : name;

    const validateFunction = (value: string) => {
        if (type === 'boolean') {
            return formFieldUtils.validateBoolean(value) || `${label} must be set to "true" or "false"`;
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
    const { onChange, onBlur, ...valueField }: IUseFormFieldReturn = editModeRef.current
        ? register(fieldName, {
              ...validationRules,
              setValueAs: (value: string) => formFieldUtils.valueSetter(value, type),
          })
        : formFieldUtils.defaultFormField(fieldName, value);

    const handleFieldChange = async (event: ChangeEvent): Promise<void> => {
        await onChange(event);
        setFieldState(getFieldState(fieldName));
    };

    const handleFieldBlur = async (event: FocusEvent): Promise<void> => {
        await onBlur(event);
        setFieldState(getFieldState(fieldName));
    };

    const alert = formFieldUtils.fieldErrorToAlert(fieldState?.error);
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
