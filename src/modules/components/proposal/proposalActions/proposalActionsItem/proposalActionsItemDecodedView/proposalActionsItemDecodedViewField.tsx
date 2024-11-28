import classNames from 'classnames';
import { useId, useState } from 'react';
import { Button, IconType, InputContainer } from '../../../../../../core';
import { useFormContext } from '../../../../../hooks';
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
    const { parameter, hideLabels, editMode = false, formPrefix, fieldName, onDeleteClick } = props;
    const { notice, type, name } = parameter;

    const inputId = useId();
    const { setValue, getValues, unregister } = useFormContext(editMode);

    const isArray = proposalActionsItemFormFieldUtils.isArrayType(type);
    const isTuple = proposalActionsItemFormFieldUtils.isTupleType(type);
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
                    <Button iconLeft={IconType.CLOSE} size="lg" variant="tertiary" onClick={onDeleteClick} />
                )}
            </div>
        );
    }

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
            <div
                className={classNames('flex flex-col gap-2', {
                    'rounded-xl border border-neutral-100 p-4': isNestedType,
                })}
            >
                <div className="flex grow flex-row gap-2">
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
                            variant="tertiary"
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
                        className={classNames('self-start')}
                    >
                        Add
                    </Button>
                )}
            </div>
        </InputContainer>
    );
};
