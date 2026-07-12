import { type ChangeEvent, useEffect } from 'react';
import { useController } from 'react-hook-form';
import { InputText, TextArea } from '../../../../../../core';
import { useFormContext } from '../../../../../hooks';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import { type ProposalActionsFieldValue, proposalActionsDecoderUtils } from '../proposalActionsDecoderUtils';
import type { IProposalActionsDecoderTextFieldComponentProps } from './proposalActionsDecoderTextField.api';

export interface IProposalActionsDecoderTextFieldEditProps extends IProposalActionsDecoderTextFieldComponentProps {}

export const ProposalActionsDecoderTextFieldEdit: React.FC<IProposalActionsDecoderTextFieldEditProps> = (props) => {
    const { parameter, fieldName, component = 'input', ...otherProps } = props;

    const { name, type } = parameter;
    const isArrayType = proposalActionsDecoderUtils.isArrayType(type);
    const isStringType = proposalActionsDecoderUtils.isStringType(type);

    const { copy } = useGukModulesContext();
    const { watch } = useFormContext<Record<string, ProposalActionsFieldValue>>(true);

    const errorMessages = copy.proposalActionsDecoder.validation;
    const validateFunction = (value: ProposalActionsFieldValue) =>
        proposalActionsDecoderUtils.validateValue(value, { label: name, type, required: true, errorMessages });

    // Skip validation for string types (empty strings are valid Solidity values) and for array / tuple types, which
    // are hidden registration fields whose nested fields validate themselves.
    const skipValidation = isArrayType || isStringType || proposalActionsDecoderUtils.isTupleType(type);

    // Watch value for changes as useControlled does not return updated value for array types
    // Note: using watch instead of useWatch because of form values being out of sync otherwise
    const fieldValue = watch(fieldName);

    const { fieldState, field } = useController<Record<string, ProposalActionsFieldValue>>({
        name: fieldName,
        rules: { validate: skipValidation ? undefined : validateFunction },
    });

    const { error } = fieldState;
    const { value, onChange, ...fieldProps } = field;

    useEffect(() => {
        // Initialise array types as empty arrays and string types as empty strings to properly encode transaction data
        if (isArrayType && fieldValue == null) {
            onChange([]);
        } else if (isStringType && fieldValue == null) {
            onChange('');
        }
    }, [fieldValue, isArrayType, isStringType, onChange]);

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (type === 'bool') {
            const newValue = event.target.value;
            const parsedValue = proposalActionsDecoderUtils.validateBoolean(newValue)
                ? newValue === 'true'
                : newValue.toLocaleLowerCase();
            onChange(parsedValue);
        } else if (proposalActionsDecoderUtils.isNumberType(type)) {
            // Allow only numbers and one "-" negative sign
            const newValue = event.target.value.replace(/[^0-9-]/g, '').replace(/(?!^-)-/g, '');
            onChange(newValue);
        } else {
            onChange(event);
        }
    };

    const alert = error?.message == null ? undefined : { message: error.message, variant: 'critical' as const };
    const Component = component === 'textarea' ? TextArea : InputText;
    const processedValue = fieldValue?.toString() ?? '';

    return (
        <Component alert={alert} onChange={handleFieldChange} value={processedValue} {...fieldProps} {...otherProps} />
    );
};
