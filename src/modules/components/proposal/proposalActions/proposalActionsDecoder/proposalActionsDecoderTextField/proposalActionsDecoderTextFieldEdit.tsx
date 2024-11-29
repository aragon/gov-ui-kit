import type { ChangeEvent } from 'react';
import { useController } from 'react-hook-form';
import { InputText, TextArea } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import { proposalActionsDecoderUtils, type ProposalActionsFieldValue } from '../proposalActionsDecoderUtils';
import type { IProposalActionsDecoderTextFieldComponentProps } from './proposalActionsDecoderTextField.api';

export interface IProposalActionsDecoderTextFieldEditProps extends IProposalActionsDecoderTextFieldComponentProps {}

export const ProposalActionsDecoderTextFieldEdit: React.FC<IProposalActionsDecoderTextFieldEditProps> = (props) => {
    const { parameter, fieldName, component = 'input', ...otherProps } = props;
    const { name, type } = parameter;

    const { copy } = useGukModulesContext();

    const errorMessages = copy.proposalActionsDecoder.validation;
    const validateParams = { label: name, type, required: true, errorMessages };
    const { fieldState, field } = useController<Record<string, ProposalActionsFieldValue>>({
        name: fieldName,
        rules: {
            validate: (value: ProposalActionsFieldValue) =>
                proposalActionsDecoderUtils.validateValue(value, validateParams),
        },
    });

    const { error } = fieldState;
    const { value, onChange, ...fieldProps } = field;

    const alert = error?.message != null ? { message: error.message, variant: 'critical' as const } : undefined;
    const inputProps = { alert, type: type.includes('uint') ? 'number' : 'text' };

    const Component = component === 'textarea' ? TextArea : InputText;

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (type === 'bool') {
            const newValue = event.target.value;
            const parsedValue = proposalActionsDecoderUtils.validateBoolean(newValue)
                ? newValue === 'true'
                : newValue.toString().toLocaleLowerCase();
            onChange(parsedValue);
        } else {
            onChange(event);
        }
    };

    return (
        <Component
            placeholder={type}
            value={value?.toString()}
            onChange={handleFieldChange}
            {...inputProps}
            {...fieldProps}
            {...otherProps}
        />
    );
};
