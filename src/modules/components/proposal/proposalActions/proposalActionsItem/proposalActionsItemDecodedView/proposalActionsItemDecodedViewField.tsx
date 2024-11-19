import classNames from 'classnames';
import { useId } from 'react';
import { InputContainer, invariant } from '../../../../../../core';
import type { IProposalActionInputDataParameter } from '../../proposalActionsDefinitions';
import type { IProposalActionsItemProps } from '../proposalActionsItem.api';
import { ProposalActionsItemFormField, proposalActionsItemFormFieldUtils } from '../proposalActionsItemFormField';

export interface IProposalActionsItemDecodedViewFieldProps extends Pick<IProposalActionsItemProps, 'editMode'> {
    /**
     * Parameter to be rendered.
     */
    parameter: IProposalActionInputDataParameter;
    /**
     * Form prefix to be used on all form fields.
     */
    formPrefix: string;
    /**
     * Parameter index set for nested types (tuple or array).
     */
    index?: number;
    /**
     * Hides the sub-component labels when set to true.
     */
    hideLabels?: boolean;
}

export const ProposalActionsItemDecodedViewField: React.FC<IProposalActionsItemDecodedViewFieldProps> = (props) => {
    const { parameter, hideLabels, editMode, formPrefix, index } = props;
    const { notice, value, type, components } = parameter;

    const inputId = useId();

    const fieldName = proposalActionsItemFormFieldUtils.getParameterLabel(parameter);
    const inputLabels = !hideLabels ? { label: fieldName, helpText: notice } : undefined;

    const isTuple = type === 'tuple';
    const isArray = type.endsWith('[]');
    const isNestedType = isTuple || isArray;

    if (!isNestedType) {
        // Remove last index from formPrefix and set it as field name instead for nested types.
        // E.g. formPrefix: inputData.parameters, fieldName: 0
        const processedPrefix = index != null ? formPrefix.split('.').slice(0, -1).join('.') : formPrefix;
        const fieldName = index != null ? index.toString() : 'value';

        return (
            <ProposalActionsItemFormField
                parameter={parameter}
                fieldName={fieldName}
                hideLabels={hideLabels}
                editMode={editMode}
                formPrefix={processedPrefix}
            />
        );
    }

    invariant(Array.isArray(value), `ProposalActionsItemArrayField: value must be an array for ${type} type`);
    invariant(
        proposalActionsItemFormFieldUtils.guardArrayType(value),
        'ProposalActionsItemArrayField: value contain unsupported types.',
    );

    // Do not add another "value" key to formPrefix if already present.
    // E.g. use inputData.parameters.1.value.1.0 for nested tuples or arrays
    const getParameterFormPrefix = (index: number) =>
        formPrefix.includes('value') ? `${formPrefix}.${index.toString()}` : `${formPrefix}.value.${index.toString()}`;

    const parameters = isTuple
        ? components?.map((component, index) => ({ ...component, value: value[index] }))
        : value.map((item) => ({ ...parameter, type: type.slice(0, -2), value: item }));

    return (
        <InputContainer id={inputId} useCustomWrapper={true} {...inputLabels}>
            <div className={classNames('flex flex-col gap-2', { 'pl-4': isTuple })}>
                {parameters?.map((parameter, index) => (
                    <ProposalActionsItemDecodedViewField
                        key={index}
                        parameter={parameter}
                        hideLabels={isArray}
                        editMode={editMode}
                        formPrefix={getParameterFormPrefix(index)}
                        index={index}
                    />
                ))}
            </div>
        </InputContainer>
    );
};
