import { Button, clipboardUtils, InputText, TextArea } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalAction } from '../../proposalActionsTypes';

export interface IProposalActionsActionRawViewProps {
    /**
     * Proposal action to render raw view for.
     */
    action: IProposalAction;
}

export const ProposalActionsActionRawView: React.FC<IProposalActionsActionRawViewProps> = (props) => {
    const { action } = props;

    const { copy } = useGukModulesContext();

    return (
        <div className="flex w-full flex-col gap-y-3">
            <InputText label={copy.proposalActionsActionRawView.to} value={action.to} disabled={true} />
            <InputText label={copy.proposalActionsActionRawView.value} value={action.value} disabled={true} />
            <TextArea label={copy.proposalActionsActionRawView.data} value={action.data} disabled={true} />
            <Button className="self-end" variant="tertiary" size="md" onClick={() => clipboardUtils.copy(action.data)}>
                {copy.proposalActionsActionRawView.copyButton}
            </Button>
        </div>
    );
};
