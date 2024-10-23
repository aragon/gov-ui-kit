import { InputText } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalAction } from '../../proposalActionsTypes';

export interface IProposalActionsActionDecodedViewProps {
    /**
     * Proposal action to render decoded view for.
     */
    action: IProposalAction;
}

export const ProposalActionsActionDecodedView: React.FC<IProposalActionsActionDecodedViewProps> = (props) => {
    const { action } = props;
    const { copy } = useGukModulesContext();

    return (
        <div className="flex w-full flex-col gap-y-3">
            <InputText
                label={copy.proposalActionsActionDecodedView.valueLabel}
                helpText={copy.proposalActionsActionDecodedView.valueHelper}
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
