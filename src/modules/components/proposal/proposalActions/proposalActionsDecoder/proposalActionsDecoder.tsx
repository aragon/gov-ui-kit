import classNames from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
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
    const hasInputData = inputData != null;

    const functionName = inputData?.function ?? '';
    const parameters = useMemo(() => (hasInputData ? inputData.parameters : []), [hasInputData, inputData?.parameters]);

    const isPayableAction = inputData?.stateMutability === 'payable';
    const hasParameters = parameters.length > 0;

    const { copy } = useGukModulesContext();
    const { watch, setValue, getValues } = useFormContext<NestedProposalActionFormValues>(
        mode === ProposalActionsDecoderMode.EDIT,
    );

    const dataFieldName = proposalActionsDecoderUtils.getFieldName('data', formPrefix);

    const updateEncodedData = useCallback(
        (values: NestedProposalActionFormValues) => {
            if (!hasInputData) {
                return;
            }

            const functionParameters = proposalActionsDecoderUtils.formValuesToFunctionParameters(values, formPrefix);
            const actionAbi = [{ type: 'function', name: functionName, inputs: parameters }];
            let encodedData = '0x';

            try {
                encodedData = encodeFunctionData({ abi: actionAbi, args: functionParameters });
            } catch {
                // Ignore invalid form values.
            } finally {
                if (getValues(dataFieldName) !== encodedData) {
                    setValue(dataFieldName, encodedData);
                }
            }
        },
        [hasInputData, functionName, parameters, dataFieldName, setValue, formPrefix, getValues],
    );

    // Initial encoding for decoded view when the function has no parameters.
    useEffect(() => {
        const shouldAutoEncode =
            hasInputData &&
            mode === ProposalActionsDecoderMode.EDIT &&
            view === ProposalActionsDecoderView.DECODED &&
            !hasParameters;

        if (!shouldAutoEncode) {
            return;
        }

        const actionAbi = [{ type: 'function', name: functionName, inputs: [] }];
        let encodedData = '0x';

        try {
            encodedData = encodeFunctionData({ abi: actionAbi, args: [] });
        } catch {
            // Ignore – keep existing data.
        }

        if (getValues(dataFieldName) !== encodedData) {
            setValue(dataFieldName, encodedData);
        }
    }, [hasInputData, mode, view, hasParameters, functionName, dataFieldName, setValue, getValues]);

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
    }, [mode, watch, updateEncodedData, dataFieldName, view, formPrefix]);

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
                    {parameters.map((parameter, index) => (
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
                    {!hasParameters && (
                        <AlertCard message={copy.proposalActionsDecoder.noParametersMessage} variant="info" />
                    )}
                </>
            )}
        </div>
    );
};
