import { InputText, invariant, TextArea } from '../../../../../../core';
import { type IProposalActionInputDataParameter } from '../../proposalActionsDefinitions';
import type { IProposalActionsItemProps } from '../proposalActionsItem.api';
import { proposalActionsItemFormFieldUtils } from './proposalActionsItemFormFieldUtils';
import { useProposalActionsItemFormField } from './useProposalActionsItemFormField';

export interface IProposalActionsItemFormFieldProps extends Pick<IProposalActionsItemProps, 'editMode' | 'formPrefix'> {
    /**
     * Text parameter to be rendered.
     */
    parameter: IProposalActionInputDataParameter;
    /**
     * Name of the input field.
     */
    fieldName: string;
    /**
     * Hides the default labels when set to true.
     */
    hideLabels?: boolean;
    /**
     * Component to be used.
     * @default input
     */
    component?: 'textarea' | 'input';
}

export const ProposalActionsItemFormField: React.FC<IProposalActionsItemFormFieldProps> = (props) => {
    const { parameter, hideLabels, editMode, fieldName, formPrefix, component = 'input', ...otherProps } = props;

    const { name, notice, value, type } = parameter;

    invariant(
        proposalActionsItemFormFieldUtils.guardValueType(value),
        'ProposalActionsItemTextField: value type is not supported',
    );

    const fieldType = proposalActionsItemFormFieldUtils.parseType(type);

    const formFieldOptions = { formPrefix, value, label: name, editMode, type: fieldType, required: true };
    const { label, ...textField } = useProposalActionsItemFormField(fieldName, formFieldOptions);

    const inputLabels = !hideLabels ? { label: name, helpText: notice } : undefined;
    const Component = component === 'textarea' ? TextArea : InputText;

    return <Component placeholder={type} {...inputLabels} {...textField} {...otherProps} />;
};
