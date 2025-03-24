import { useEffect, type ChangeEvent } from 'react';
import { useController } from 'react-hook-form';
import { InputText, TextArea } from '../../../../../../core';
import { useFormContext } from '../../../../../hooks';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import { proposalActionsDecoderUtils, type ProposalActionsFieldValue } from '../proposalActionsDecoderUtils';
import type { IProposalActionsDecoderTextFieldComponentProps } from './proposalActionsDecoderTextField.api';

export interface IProposalActionsDecoderTextFieldEditProps extends IProposalActionsDecoderTextFieldComponentProps {}

export const ProposalActionsDecoderTextFieldEdit: React.FC<IProposalActionsDecoderTextFieldEditProps> = (props) => {
    const { parameter, fieldName, component = 'input', ...otherProps } = props;

    const { name, type } = parameter;
    const isArrayType = proposalActionsDecoderUtils.isArrayType(type);

    const { copy } = useGukModulesContext();
    const { watch } = useFormContext<Record<string, ProposalActionsFieldValue>>(true);

    const errorMessages = copy.proposalActionsDecoder.validation;
    const validateFunction = (value: ProposalActionsFieldValue) =>
        proposalActionsDecoderUtils.validateValue(value, { label: name, type, required: true, errorMessages });

    // Watch value for changes as useControlled does not return updated value for array types
    // Note: using watch instead of useWatch because of form values being out of sync otherwise
    const fieldValue = watch(fieldName);

    const { fieldState, field } = useController<Record<string, ProposalActionsFieldValue>>({
        name: fieldName,
        rules: { validate: !isArrayType ? validateFunction : undefined },
    });

    const { error } = fieldState;
    const { value, onChange, ...fieldProps } = field;

    useEffect(() => {
        // Initialise array types as empty arrays to properly decode transaction data
        if (isArrayType && fieldValue == null) {
            onChange([]);
        }
    }, [fieldValue, isArrayType, onChange]);

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (type === 'bool') {
            const newValue = event.target.value;
            const parsedValue = proposalActionsDecoderUtils.validateBoolean(newValue)
                ? newValue === 'true'
                : newValue.toString().toLocaleLowerCase();
            onChange(parsedValue);
        } else if (proposalActionsDecoderUtils.isNumberType(type)) {
            // Allow only numbers and one "-" negative sign
            const newValue = event.target.value.replace(/[^0-9-]/g, '').replace(/(?!^-)-/g, '');
            onChange(newValue);
        } else {
            onChange(event);
        }
    };

    const alert = error?.message != null ? { message: error.message, variant: 'critical' as const } : undefined;
    const Component = component === 'textarea' ? TextArea : InputText;
    const processedValue = fieldValue?.toString() ?? '';

    return (
        <Component value={processedValue} onChange={handleFieldChange} alert={alert} {...fieldProps} {...otherProps} />
    );
};
