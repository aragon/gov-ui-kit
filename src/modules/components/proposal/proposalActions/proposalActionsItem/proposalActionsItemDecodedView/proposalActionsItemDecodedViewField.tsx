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
     * Form prefix to be prepended to the form field.
     */
    formPrefix: string;
    /**
     * Name of the form field.
     */
    fieldName: string;
    /**
     * Hides the sub-component labels when set to true.
     */
    hideLabels?: boolean;
    /**
     * Displays a delete button triggering this callback when set, to be used for array types.
     */
    onDeleteClick?: () => void;
}

export const ProposalActionsItemDecodedViewField: React.FC<IProposalActionsItemDecodedViewFieldProps> = (props) => {
    const { parameter, hideLabels, editMode, formPrefix, fieldName, onDeleteClick } = props;
    const { notice, value, type } = parameter;

    // Fallback to empty object to avoid requiring a react-hook-form wrapper on read-only mode
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const { setValue, getValues, unregister } = useFormContext() ?? {};

    const inputId = useId();

    const isArray = proposalActionsItemFormFieldUtils.isArrayType(type);
    const isTuple = type === 'tuple';
    const isNestedType = isTuple || isArray;

    const initialParameters = proposalActionsItemFormFieldUtils.getNestedParameters(parameter);
    const [nestedParameters, setNestedParameters] = useState<IProposalActionInputDataParameter[]>(initialParameters);

    if (!isNestedType) {
        return (
            <>
                {onDeleteClick != null && (
                    <Button iconLeft={IconType.CLOSE} size="sm" variant="secondary" onClick={onDeleteClick} />
                )}
                <ProposalActionsItemFormField
                    parameter={parameter}
                    fieldName={fieldName}
                    hideLabels={hideLabels}
                    editMode={editMode}
                    formPrefix={formPrefix}
                />
            </>
        );
    }

    invariant(Array.isArray(value), `ProposalActionsItemArrayField: value must be an array for ${type} type`);
    invariant(
        proposalActionsItemFormFieldUtils.guardArrayType(value),
        'ProposalActionsItemArrayField: value contain unsupported types.',
    );

    const handleAddArrayItem = () => {
        const defaultNestedParameter = proposalActionsItemFormFieldUtils.getDefaultNestedParameter(parameter);
        const newNestedParameters = nestedParameters.concat(defaultNestedParameter);
        setNestedParameters(newNestedParameters);
    };

    const handleRemoveArrayItem = (index: number) => () => {
        const arrayFieldName = `${formPrefix}.${fieldName}`;
        const currentValues = getValues(arrayFieldName) as string[];
        const newNestedParameters = nestedParameters.toSpliced(index, 1);
        const newValues = currentValues.toSpliced(index, 1);
        unregister(`${formPrefix}.${fieldName}.${(nestedParameters.length - 1).toString()}`);
        setValue(arrayFieldName, newValues);
        setNestedParameters(newNestedParameters);
    };

    const fieldLabel = proposalActionsItemFormFieldUtils.getParameterLabel({ parameter });
    const inputLabels = !hideLabels ? { label: fieldLabel, helpText: notice } : undefined;

    return (
        <InputContainer id={inputId} useCustomWrapper={true} {...inputLabels}>
            <div className={classNames('flex flex-col gap-2', { 'pl-4': isTuple })}>
                {onDeleteClick != null && (
                    <Button iconLeft={IconType.CLOSE} size="sm" variant="secondary" onClick={onDeleteClick} />
                )}
                {nestedParameters.map((parameter, index) => (
                    <ProposalActionsItemDecodedViewField
                        key={index}
                        parameter={parameter}
                        hideLabels={isArray}
                        editMode={editMode}
                        formPrefix={`${formPrefix}.${fieldName}`}
                        fieldName={index.toString()}
                        onDeleteClick={isArray ? handleRemoveArrayItem(index) : undefined}
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
