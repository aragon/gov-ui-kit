import { type IInputTextProps, InputText, invariant } from '../../../../../../core';
import { useFormField } from '../../../../../hooks';
import { formFieldUtils } from '../../../../../hooks/useFormField/formFieldUtils';
import { type IProposalActionInputDataParameter } from '../../proposalActionsDefinitions';
import type { IProposalActionsItemProps } from '../proposalActionsItem.api';
import { proposalActionsItemFormFieldUtils } from './proposalActionsItemFormFieldUtils';

export interface IProposalActionsItemFormFieldProps
    extends IInputTextProps,
        Pick<IProposalActionsItemProps, 'editMode' | 'formPrefix'> {
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
}

export const ProposalActionsItemFormField: React.FC<IProposalActionsItemFormFieldProps> = (props) => {
    const { parameter, hideLabels, editMode, fieldName, formPrefix, ...otherProps } = props;

    const { notice, value, type } = parameter;

    invariant(
        proposalActionsItemFormFieldUtils.guardValueType(value),
        'ProposalActionsItemTextField: value type is not supported',
    );

    const fieldLabel = proposalActionsItemFormFieldUtils.getParameterLabel(parameter);
    const fieldType = formFieldUtils.parseType(type);

    const { label, ...textField } = useFormField(fieldName, {
        formPrefix,
        value: value as string,
        label: parameter.name,
        editMode,
        type: fieldType,
        required: true,
    });

    const inputLabels = !hideLabels ? { label: fieldLabel, helpText: notice } : undefined;

    return <InputText placeholder={label} {...inputLabels} {...textField} {...otherProps} />;
};
