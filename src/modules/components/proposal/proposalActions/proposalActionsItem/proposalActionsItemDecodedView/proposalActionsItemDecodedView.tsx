import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalAction } from '../../proposalActionsDefinitions';
import type { IProposalActionsItemProps } from '../proposalActionsItem.api';
import { ProposalActionsItemFormField } from '../proposalActionsItemFormField';
import { ProposalActionsItemDecodedViewField } from './proposalActionsItemDecodedViewField';

export interface IProposalActionsItemDecodedViewProps
    extends Pick<IProposalActionsItemProps, 'editMode' | 'formPrefix'> {
    /**
     * Proposal action to render decoded view for.
     */
    action: IProposalAction;
}

export const ProposalActionsItemDecodedView: React.FC<IProposalActionsItemDecodedViewProps> = (props) => {
    const { action, editMode, formPrefix } = props;

    const { copy } = useGukModulesContext();

    if (action.inputData == null) {
        return null;
    }

    const { parameters, payable } = action.inputData;

    const getParameterPrefix = (index: number) => {
        const prefix = `inputData.parameters.${index.toString()}`;

        return formPrefix ? `${formPrefix}.${prefix}` : prefix;
    };

    return (
        <div className="flex w-full flex-col gap-3">
            {payable && (
                <ProposalActionsItemFormField
                    fieldName="value"
                    editMode={editMode}
                    formPrefix={formPrefix}
                    includeTypeOnLabel={false}
                    parameter={{
                        name: 'value',
                        notice: copy.proposalActionsItemDecodedView.valueHelper,
                        value: action.value,
                        type: 'uint',
                    }}
                />
            )}
            {parameters.map((parameter, index) => (
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
