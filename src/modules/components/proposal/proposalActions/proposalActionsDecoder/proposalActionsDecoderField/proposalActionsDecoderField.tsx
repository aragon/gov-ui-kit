import classNames from 'classnames';
import { useId, useState } from 'react';
import { Button, IconType, InputContainer } from '../../../../../../core';
import { useFormContext } from '../../../../../hooks';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalActionInputDataParameter } from '../../proposalActionsDefinitions';
import { type IProposalActionsDecoderProps, ProposalActionsDecoderMode } from '../proposalActionsDecoder.api';
import { ProposalActionsDecoderTextField } from '../proposalActionsDecoderTextField';
import { proposalActionsDecoderUtils } from '../proposalActionsDecoderUtils';

export interface IProposalActionsDecoderFieldProps extends Pick<IProposalActionsDecoderProps, 'mode' | 'formPrefix'> {
    /**
     * Parameter to be rendered.
     */
    parameter: IProposalActionInputDataParameter;
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

export const ProposalActionsDecoderField: React.FC<IProposalActionsDecoderFieldProps> = (props) => {
    const { parameter, hideLabels, formPrefix, fieldName, mode, onDeleteClick } = props;
    const { notice, type, name } = parameter;

    const inputId = useId();
    const { copy } = useGukModulesContext();
    const { setValue, getValues, unregister } = useFormContext(mode === ProposalActionsDecoderMode.EDIT);

    const isArray = proposalActionsDecoderUtils.isArrayType(type);
    const isTuple = proposalActionsDecoderUtils.isTupleType(type);
    const isNestedType = isTuple || isArray;

    const initialParameters = proposalActionsDecoderUtils.getNestedParameters(parameter);
    const [nestedParameters, setNestedParameters] = useState<IProposalActionInputDataParameter[]>(initialParameters);

    if (!isNestedType) {
        return (
            <div className="flex flex-row items-start gap-2">
                <ProposalActionsDecoderTextField
                    fieldName={fieldName}
                    formPrefix={formPrefix}
                    hideLabels={hideLabels}
                    mode={mode}
                    parameter={parameter}
                />
                {onDeleteClick != null && mode === ProposalActionsDecoderMode.EDIT && (
                    <Button iconLeft={IconType.CLOSE} onClick={onDeleteClick} size="lg" variant="tertiary" />
                )}
            </div>
        );
    }

    const handleAddArrayItem = () => {
        const nestedParameterType = proposalActionsDecoderUtils.getArrayItemType(parameter.type);
        const defaultNestedParameter = { ...parameter, type: nestedParameterType, value: undefined };
        const newNestedParameters = nestedParameters.concat(defaultNestedParameter);
        setNestedParameters(newNestedParameters);
    };

    const handleRemoveArrayItem = (index: number) => () => {
        const arrayFieldName = proposalActionsDecoderUtils.getFieldName(fieldName, formPrefix);
        const currentValues = getValues(arrayFieldName) as string[];
        const newNestedParameters = nestedParameters.toSpliced(index, 1);
        const newValues = currentValues.toSpliced(index, 1);
        unregister(proposalActionsDecoderUtils.getFieldName((nestedParameters.length - 1).toString(), arrayFieldName));
        setValue(arrayFieldName, newValues);
        setNestedParameters(newNestedParameters);
    };

    return (
        <InputContainer
            helpText={hideLabels ? undefined : notice}
            id={inputId}
            label={hideLabels ? undefined : name}
            useCustomWrapper={true}
        >
            <div
                className={classNames('flex flex-col gap-2', {
                    'rounded-xl border border-neutral-100 p-4': isNestedType,
                })}
            >
                {/* Render text-field as hidden to register array field */}
                <ProposalActionsDecoderTextField
                    className="hidden"
                    fieldName={proposalActionsDecoderUtils.getFieldName(fieldName, formPrefix)}
                    mode={mode}
                    parameter={parameter}
                />
                <div className="flex grow flex-row gap-2">
                    <div className="flex grow flex-col gap-2">
                        {nestedParameters.map((parameter, index) => (
                            <ProposalActionsDecoderField
                                fieldName={index.toString()}
                                formPrefix={proposalActionsDecoderUtils.getFieldName(fieldName, formPrefix)}
                                hideLabels={isArray}
                                // biome-ignore lint/suspicious/noArrayIndexKey: dynamic parameter list with no stable identity
                                key={index}
                                mode={mode}
                                onDeleteClick={isArray ? handleRemoveArrayItem(index) : undefined}
                                parameter={parameter}
                            />
                        ))}
                    </div>
                    {onDeleteClick != null && mode === ProposalActionsDecoderMode.EDIT && (
                        <Button
                            className="self-start"
                            iconLeft={IconType.CLOSE}
                            onClick={onDeleteClick}
                            size="lg"
                            variant="tertiary"
                        />
                    )}
                </div>
                {isArray && mode === ProposalActionsDecoderMode.EDIT && (
                    <Button
                        className="self-start"
                        iconLeft={IconType.PLUS}
                        onClick={handleAddArrayItem}
                        size="md"
                        variant="tertiary"
                    >
                        {copy.proposalActionsDecoder.add}
                    </Button>
                )}
            </div>
        </InputContainer>
    );
};
