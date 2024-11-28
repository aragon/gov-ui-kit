import { useCallback, useEffect } from 'react';
import { type DeepPartial } from 'react-hook-form';
import { encodeFunctionData } from 'viem';
import { useFormContext } from '../../../../../hooks';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalAction } from '../../proposalActionsDefinitions';
import type { IProposalActionsItemProps } from '../proposalActionsItem.api';
import { ProposalActionsItemFormField } from '../proposalActionsItemFormField';
import { useProposalActionsItemFormField } from '../proposalActionsItemFormField/useProposalActionsItemFormField';
import { ProposalActionsItemDecodedViewField } from './proposalActionsItemDecodedViewField';

export interface IProposalActionsItemDecodedViewProps
    extends Pick<IProposalActionsItemProps, 'editMode' | 'formPrefix'> {
    /**
     * Proposal action to render decoded view for.
     */
    action: IProposalAction;
}

export const ProposalActionsItemDecodedView: React.FC<IProposalActionsItemDecodedViewProps> = (props) => {
    const { action, editMode = false, formPrefix } = props;

    const { parameters, payable, function: functionName } = action.inputData ?? {};

    const { copy } = useGukModulesContext();
    const { watch, setValue } = useFormContext<IProposalAction>(editMode);

    const dataFieldName = formPrefix ? `${formPrefix}.data` : 'data';
    useProposalActionsItemFormField('data', { label: '', type: 'string', editMode, formPrefix, value: action.data });

    const updateEncodedData = useCallback(
        (formValues: DeepPartial<IProposalAction>) => {
            const functionParameters = formValues.inputData?.parameters?.map((parameter) => parameter?.value);
            const actionAbi = [{ type: 'function', name: functionName, inputs: parameters }];

            try {
                const data = encodeFunctionData({ abi: actionAbi, functionName, args: functionParameters });
                // @ts-expect-error Limitation of react-hook-form, ignore error
                setValue(dataFieldName, data);
            } catch (error: unknown) {
                // Form values are not valid, ignore error
            }
        },
        [functionName, parameters, dataFieldName, setValue],
    );

    useEffect(() => {
        if (!editMode) {
            return;
        }

        const { unsubscribe } = watch((formValues, { name }) =>
            name === dataFieldName ? undefined : updateEncodedData(formValues),
        );

        return () => unsubscribe();
    }, [editMode, watch, setValue, updateEncodedData, dataFieldName]);

    const getParameterPrefix = (index: number) => {
        const prefix = `inputData.parameters.${index.toString()}`;

        return formPrefix ? `${formPrefix}.${prefix}` : prefix;
    };

    if (action.inputData == null) {
        return null;
    }

    return (
        <div className="flex w-full flex-col gap-3">
            {payable && (
                <ProposalActionsItemFormField
                    fieldName="value"
                    editMode={editMode}
                    formPrefix={formPrefix}
                    parameter={{
                        name: 'value',
                        notice: copy.proposalActionsItemDecodedView.valueHelper,
                        value: action.value,
                        type: 'uint',
                    }}
                />
            )}
            {parameters?.map((parameter, index) => (
                <ProposalActionsItemDecodedViewField
                    key={parameter.name}
                    parameter={parameter}
                    editMode={editMode}
                    formPrefix={getParameterPrefix(index)}
                    fieldName="value"
                />
            ))}
        </div>
    );
};
