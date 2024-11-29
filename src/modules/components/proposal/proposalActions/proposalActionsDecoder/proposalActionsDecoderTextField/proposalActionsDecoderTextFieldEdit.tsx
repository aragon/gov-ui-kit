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

    const errorMessages = copy.proposalActionsItemFormField;
    const validationRulesParams = { label: name, type, required: true, errorMessages };
    const validationRules = proposalActionsDecoderUtils.getValidationRules(validationRulesParams);

    const { fieldState, field } = useController<Record<string, ProposalActionsFieldValue>>({
        name: fieldName,
        rules: validationRules,
    });

    const { error } = fieldState;
    const { value, ...fieldProps } = field;

    const alert = error?.message != null ? { message: error.message, variant: 'critical' as const } : undefined;
    const inputProps = { alert, type: type.includes('uint') ? 'number' : 'text' };

    const Component = component === 'textarea' ? TextArea : InputText;

    return (
        <Component placeholder={type} value={field.value?.toString()} {...inputProps} {...fieldProps} {...otherProps} />
    );
};
