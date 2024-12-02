import classNames from 'classnames';
import { useCallback, useEffect } from 'react';
import { encodeFunctionData } from 'viem';
import { Button, clipboardUtils } from '../../../../../core';
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

    const dataFieldName = proposalActionsDecoderUtils.getFieldName('data', formPrefix) as 'data';

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
                // @ts-expect-error Limitation of react-hook-form, ignore error
                setValue(dataFieldName, data);
            }
        },
        [inputData, dataFieldName, setValue, formPrefix],
    );

    useEffect(() => {
        if (mode !== ProposalActionsDecoderMode.EDIT || view !== ProposalActionsDecoderView.DECODED) {
            return;
        }

        const shouldEncodeData = (fieldName?: string) =>
            (formPrefix == null || fieldName?.includes(formPrefix)) && fieldName !== dataFieldName;

        const { unsubscribe } = watch((values, { name }) =>
            shouldEncodeData(name) ? updateEncodedData(values) : undefined,
        );

        return () => unsubscribe();
    }, [mode, watch, setValue, updateEncodedData, dataFieldName, view, formPrefix]);

    const handleCopyDataClick = () => clipboardUtils.copy(action.data);

    return (
        <div className={classNames('flex w-full flex-col gap-3', className)} {...otherProps}>
            {(view === ProposalActionsDecoderView.RAW || action.inputData?.payable) && (
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
            {view === ProposalActionsDecoderView.DECODED &&
                inputData?.parameters.map((parameter, index) => (
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
        </div>
    );
};
