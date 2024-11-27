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
    const { notice, value, type, name } = parameter;

    // Fallback to empty object to avoid requiring a react-hook-form wrapper on read-only mode
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const { setValue, getValues, unregister } = useFormContext() ?? {};

    const inputId = useId();

    const isArray = proposalActionsItemFormFieldUtils.isArrayType(type);
    const isTuple = proposalActionsItemFormFieldUtils.isTupleType(type);
    const isTupleArray = proposalActionsItemFormFieldUtils.isTupleArrayType(type);
    const isNestedType = isTuple || isArray;

    const initialParameters = proposalActionsItemFormFieldUtils.getNestedParameters(parameter);
    const [nestedParameters, setNestedParameters] = useState<IProposalActionInputDataParameter[]>(initialParameters);

    if (!isNestedType) {
        return (
            <div className="flex flex-row items-center gap-2">
                <ProposalActionsItemFormField
                    parameter={parameter}
                    fieldName={fieldName}
                    hideLabels={hideLabels}
                    editMode={editMode}
                    formPrefix={formPrefix}
                />
                {onDeleteClick != null && editMode && (
                    <Button iconLeft={IconType.CLOSE} size="lg" variant="ghost" onClick={onDeleteClick} />
                )}
            </div>
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

    const inputLabels = !hideLabels ? { label: name, helpText: notice } : undefined;

    return (
        <InputContainer id={inputId} useCustomWrapper={true} {...inputLabels}>
            <div className={classNames('flex flex-col gap-2', { 'pl-4': isTuple })}>
                <div
                    className={classNames('flex grow flex-row gap-2', {
                        'rounded-xl border border-neutral-100 bg-neutral-0 p-4': isTuple || isArray,
                    })}
                >
                    <div className="flex grow flex-col gap-2">
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
                    </div>
                    {onDeleteClick != null && editMode && (
                        <Button
                            iconLeft={IconType.CLOSE}
                            size="lg"
                            variant="ghost"
                            onClick={onDeleteClick}
                            className="self-start"
                        />
                    )}
                </div>
                {isArray && editMode && (
                    <Button
                        iconLeft={IconType.PLUS}
                        size="md"
                        variant="tertiary"
                        onClick={handleAddArrayItem}
                        className={classNames('self-start', { 'ml-4': isTupleArray })}
                    >
                        Add
                    </Button>
                )}
            </div>
        </InputContainer>
    );
};
