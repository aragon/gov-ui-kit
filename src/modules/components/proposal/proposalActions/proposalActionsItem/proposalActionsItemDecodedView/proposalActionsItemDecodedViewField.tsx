import classNames from 'classnames';
import { useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, IconType, InputContainer, invariant } from '../../../../../../core';
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
    /**
     * Displays a delete button triggering this callback when set, to be used for array types.
     */
    onDeleteClick?: (fieldName: string, index: number) => void;
}

export const ProposalActionsItemDecodedViewField: React.FC<IProposalActionsItemDecodedViewFieldProps> = (props) => {
    const { parameter, hideLabels, editMode, formPrefix, index, onDeleteClick } = props;
    const { notice, value, type } = parameter;

    // Fallback to empty object to avoid requiring a react-hook-form wrapper on read-only mode
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const { setValue } = useFormContext() ?? {};

    const inputId = useId();

    const isArray = proposalActionsItemFormFieldUtils.isArrayType(type);
    const isTuple = type === 'tuple';
    const isNestedType = isTuple || isArray;

    const initialParameters = proposalActionsItemFormFieldUtils.getNestedParameters(parameter);
    const [nestedParameters, setNestedParameters] = useState<IProposalActionInputDataParameter[]>(initialParameters);

    if (!isNestedType) {
        // Remove last index from formPrefix and set it as field name instead for nested types.
        // E.g. formPrefix: inputData.parameters, fieldName: 0
        const processedPrefix = index != null ? formPrefix.split('.').slice(0, -1).join('.') : formPrefix;
        const fieldName = index?.toString() ?? 'value';

        return (
            <>
                {onDeleteClick != null && index != null && (
                    <Button
                        iconLeft={IconType.CLOSE}
                        size="sm"
                        variant="secondary"
                        onClick={() => onDeleteClick(`${processedPrefix}.${fieldName}`, index)}
                    />
                )}
                <ProposalActionsItemFormField
                    parameter={parameter}
                    fieldName={fieldName}
                    hideLabels={hideLabels}
                    editMode={editMode}
                    formPrefix={processedPrefix}
                />
            </>
        );
    }

    invariant(Array.isArray(value), `ProposalActionsItemArrayField: value must be an array for ${type} type`);
    invariant(
        proposalActionsItemFormFieldUtils.guardArrayType(value),
        'ProposalActionsItemArrayField: value contain unsupported types.',
    );

    // Do not add another "value" key to formPrefix if already present (e.g. use inputData.parameters.1.value.1.0 for nested tuples or arrays)
    const getParameterFormPrefix = (index: number) =>
        formPrefix.includes('value') ? `${formPrefix}.${index.toString()}` : `${formPrefix}.value.${index.toString()}`;

    const handleAddArrayItem = () => {
        const defaultNestedParameter = proposalActionsItemFormFieldUtils.getDefaultNestedParameter(parameter);
        const newNestedParameters = nestedParameters.concat(defaultNestedParameter);
        setNestedParameters(newNestedParameters);
    };

    const handleRemoveArrayItem = (fieldName: string, index: number) => {
        const newNestedParameters = nestedParameters.toSpliced(index, 1);
        const newValues = newNestedParameters.map((parameter) => parameter.value);
        setValue(fieldName.split('.').slice(0, -1).join('.'), newValues);
        setNestedParameters(newNestedParameters);
    };

    const fieldName = proposalActionsItemFormFieldUtils.getParameterLabel({ parameter });
    const inputLabels = !hideLabels ? { label: fieldName, helpText: notice } : undefined;

    return (
        <InputContainer id={inputId} useCustomWrapper={true} {...inputLabels}>
            <div className={classNames('flex flex-col gap-2', { 'pl-4': isTuple })}>
                {onDeleteClick != null && index != null && (
                    <Button
                        iconLeft={IconType.CLOSE}
                        size="sm"
                        variant="secondary"
                        onClick={() => onDeleteClick(formPrefix, index)}
                    />
                )}
                {nestedParameters.map((parameter, index) => (
                    <ProposalActionsItemDecodedViewField
                        key={index}
                        parameter={parameter}
                        hideLabels={isArray}
                        editMode={editMode}
                        formPrefix={getParameterFormPrefix(index)}
                        index={index}
                        onDeleteClick={isArray ? handleRemoveArrayItem : undefined}
                    />
                ))}
                {isArray && (
                    <Button
                        iconLeft={IconType.PLUS}
                        size="sm"
                        variant="secondary"
                        onClick={handleAddArrayItem}
                        className={type.includes('tuple') ? 'ml-4' : undefined}
                    />
                )}
            </div>
        </InputContainer>
    );
};
