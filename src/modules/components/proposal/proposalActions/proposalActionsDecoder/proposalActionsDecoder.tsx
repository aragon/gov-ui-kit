import classNames from 'classnames';
import { useCallback, useEffect } from 'react';
import type { DeepPartial } from 'react-hook-form';
import { encodeFunctionData } from 'viem';
import { Button, clipboardUtils } from '../../../../../core';
import { useFormContext } from '../../../../hooks';
import { useGukModulesContext } from '../../../gukModulesProvider';
import type { IProposalAction } from '../proposalActionsDefinitions';
import {
    ProposalActionsDecoderMode,
    ProposalActionsDecoderView,
    type IProposalActionsDecoderProps,
} from './proposalActionsDecoder.api';
import { ProposalActionsDecoderField } from './proposalActionsDecoderField/proposalActionsDecoderField';
import { ProposalActionsDecoderTextField } from './proposalActionsDecoderTextField';
import { proposalActionsDecoderUtils } from './proposalActionsDecoderUtils';

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

    const { watch, setValue } = useFormContext<IProposalAction>(mode === ProposalActionsDecoderMode.EDIT);

    const dataFieldName = proposalActionsDecoderUtils.getFieldName('data', formPrefix) as 'data';

    const updateEncodedData = useCallback(
        (formValues: DeepPartial<IProposalAction>) => {
            const functionParameters = formValues.inputData?.parameters?.map((parameter) => parameter?.value);
            const actionAbi = [{ type: 'function', name: inputData?.function, inputs: inputData?.parameters }];
            let data = '0x';

            try {
                data = encodeFunctionData({ abi: actionAbi, args: functionParameters });
            } finally {
                // @ts-expect-error Limitation of react-hook-form, ignore error
                setValue(dataFieldName, data);
            }
        },
        [inputData, dataFieldName, setValue],
    );

    useEffect(() => {
        if (mode !== ProposalActionsDecoderMode.EDIT || view !== ProposalActionsDecoderView.DECODED) {
            return;
        }

        const { unsubscribe } = watch((formValues, { name }) =>
            name === dataFieldName ? undefined : updateEncodedData(formValues),
        );

        return () => unsubscribe();
    }, [mode, watch, setValue, updateEncodedData, dataFieldName, view]);

    const handleCopyDataClick = () => clipboardUtils.copy(action.data);

    return (
        <div className={classNames('flex w-full flex-col gap-3', className)} {...otherProps}>
            {(view === ProposalActionsDecoderView.RAW || action.inputData?.payable) && (
                <ProposalActionsDecoderTextField
                    fieldName="value"
                    mode={mode}
                    formPrefix={formPrefix}
                    parameter={{
                        name: 'value',
                        notice: copy.proposalActionsItemDecodedView.valueHelper,
                        value: value,
                        type: 'uint',
                    }}
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
            {view === ProposalActionsDecoderView.RAW && mode === ProposalActionsDecoderMode.READ && (
                <Button variant="tertiary" size="md" onClick={handleCopyDataClick} className="self-end">
                    {copy.proposalActionsItemRawView.copyButton}
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
