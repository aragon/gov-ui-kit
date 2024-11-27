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
     * Renders the parameter type on the field label when set to true.
     * @default true
     */
    includeTypeOnLabel?: boolean;
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
    const {
        parameter,
        hideLabels,
        editMode,
        fieldName,
        formPrefix,
        component = 'input',
        includeTypeOnLabel = true,
        ...otherProps
    } = props;

    const { name, notice, value, type } = parameter;

    invariant(
        proposalActionsItemFormFieldUtils.guardValueType(value),
        'ProposalActionsItemTextField: value type is not supported',
    );

    const fieldLabel = proposalActionsItemFormFieldUtils.getParameterLabel({
        parameter,
        includeType: includeTypeOnLabel,
    });
    const fieldType = proposalActionsItemFormFieldUtils.parseType(type);

    const { label, ...textField } = useProposalActionsItemFormField(fieldName, {
        formPrefix,
        value: value as string,
        label: name,
        editMode,
        type: fieldType,
        required: true,
    });

    const inputLabels = !hideLabels ? { label: fieldLabel, helpText: notice } : undefined;
    const Component = component === 'textarea' ? TextArea : InputText;

    return <Component placeholder={label} {...inputLabels} {...textField} {...otherProps} />;
};
