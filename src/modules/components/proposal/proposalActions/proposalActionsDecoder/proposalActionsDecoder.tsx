import classNames from 'classnames';
import { useCallback, useEffect } from 'react';
import { encodeFunctionData } from 'viem';
import { AlertCard, Button, clipboardUtils } from '../../../../../core';
import { useFormContext } from '../../../../hooks';
import { useGukModulesContext } from '../../../gukModulesProvider';
import {
    ProposalActionsDecoderMode,
    ProposalActionsDecoderView,
    type IProposalActionsDecoderProps,
} from './proposalActionsDecoder.api';
import { ProposalActionsDecoderField } from './proposalActionsDecoderField';
import { ProposalActionsDecoderTextField } from './proposalActionsDecoderTextField';
import { proposalActionsDecoderUtils, type NestedProposalActionFormValues } from './proposalActionsDecoderUtils';

export const ProposalActionsDecoder: React.FC<IProposalActionsDecoderProps> = (props: IProposalActionsDecoderProps) => {
    const {
        action,
        formPrefix,
        mode = ProposalActionsDecoderMode.READ,
        view = ProposalActionsDecoderView.RAW,
        className,
        ...otherProps
    } = props;
    const { value, data, inputData } = action;

    const { copy } = useGukModulesContext();
    const { watch, setValue } = useFormContext<NestedProposalActionFormValues>(
        mode === ProposalActionsDecoderMode.EDIT,
    );

    const dataFieldName = proposalActionsDecoderUtils.getFieldName('data', formPrefix);
    const isPayableAction = action.inputData?.stateMutability === 'payable';

    const updateEncodedData = useCallback(
        (values: NestedProposalActionFormValues) => {
            const functionParameters = proposalActionsDecoderUtils.formValuesToFunctionParameters(values, formPrefix);
            const actionAbi = [{ type: 'function', name: inputData?.function, inputs: inputData?.parameters }];
            let data = '0x';

            try {
                data = encodeFunctionData({ abi: actionAbi, args: functionParameters });
            } catch (error: unknown) {
                // Form values are not valid, ignore error.
            } finally {
                setValue(dataFieldName, data);
            }
        },
        [inputData, dataFieldName, setValue, formPrefix],
    );

    // Initial encoding for functions with no parameters
    useEffect(() => {
        if (
            mode !== ProposalActionsDecoderMode.EDIT ||
            view !== ProposalActionsDecoderView.DECODED ||
            inputData?.parameters.length !== 0
        ) {
            return;
        }

        // For functions with no parameters, encode immediately on mount
        const actionAbi = [{ type: 'function', name: inputData?.function, inputs: [] }];

        try {
            const data = encodeFunctionData({ abi: actionAbi, args: [] });
            setValue(dataFieldName, data);
        } catch (error: unknown) {
            console.error('Failed to encode function with no parameters:', error);
        }
    }, [mode, view, inputData, dataFieldName, setValue]);

    useEffect(() => {
        if (mode !== ProposalActionsDecoderMode.EDIT || view !== ProposalActionsDecoderView.DECODED) {
            return;
        }

        const { unsubscribe } = watch((values, { name }) => {
            if ((formPrefix == null || name?.includes(formPrefix)) && name !== dataFieldName) {
                updateEncodedData(values);
            }
        });

        return () => unsubscribe();
    }, [mode, watch, setValue, updateEncodedData, dataFieldName, view, formPrefix]);

    const handleCopyDataClick = () => clipboardUtils.copy(action.data);

    return (
        <div className={classNames('flex w-full flex-col gap-3', className)} {...otherProps}>
            {(view === ProposalActionsDecoderView.RAW || isPayableAction) && (
                <ProposalActionsDecoderTextField
                    fieldName="value"
                    mode={mode}
                    formPrefix={formPrefix}
                    parameter={{ name: 'value', value: value, type: 'uint' }}
                />
            )}
            <ProposalActionsDecoderTextField
                fieldName="data"
                mode={mode}
                formPrefix={formPrefix}
                parameter={{ name: 'data', value: data, type: 'bytes' }}
                // Render the data field as hidden on decoded view to register the field on the form on EDIT mode
                className={view === ProposalActionsDecoderView.DECODED ? 'hidden' : undefined}
                component="textarea"
            />
            {view === ProposalActionsDecoderView.RAW && mode !== ProposalActionsDecoderMode.EDIT && (
                <Button variant="tertiary" size="md" onClick={handleCopyDataClick} className="self-end">
                    {copy.proposalActionsDecoder.copyData}
                </Button>
            )}
            {view === ProposalActionsDecoderView.DECODED && (
                <>
                    {inputData?.parameters.map((parameter, index) => (
                        <ProposalActionsDecoderField
                            key={parameter.name}
                            parameter={parameter}
                            mode={mode}
                            fieldName="value"
                            formPrefix={proposalActionsDecoderUtils.getFieldName(
                                `inputData.parameters.${index.toString()}`,
                                formPrefix,
                            )}
                        />
                    ))}
                    {inputData?.parameters.length === 0 && (
                        <AlertCard
                            className="text-warning-500 flex items-center gap-1 text-sm"
                            message={copy.proposalActionsDecoder.noParametersMessage}
                            variant="warning"
                        />
                    )}
                </>
            )}
        </div>
    );
};
