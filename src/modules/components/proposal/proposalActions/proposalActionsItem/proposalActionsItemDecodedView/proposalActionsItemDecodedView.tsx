import { InputText } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalAction } from '../../types';

export interface IProposalActionsItemDecodedViewProps {
    /**
     * Proposal action to render decoded view for.
     */
    action: IProposalAction;
}

export const ProposalActionsItemDecodedView: React.FC<IProposalActionsItemDecodedViewProps> = (props) => {
    const { action } = props;

    const { copy } = useGukModulesContext();

    return (
        <div className="flex w-full flex-col gap-y-3">
            <InputText
                label={copy.proposalActionsItemDecodedView.valueLabel}
                helpText={copy.proposalActionsItemDecodedView.valueHelper}
                value={action.value}
                disabled={true}
            />
            {action.inputData?.parameters.map((parameter) => (
                <InputText
                    key={parameter.name}
                    label={parameter.name}
                    helpText={parameter.notice}
                    value={parameter.value}
                    disabled={true}
                />
            ))}
        </div>
    );
};
