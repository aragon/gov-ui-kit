import { Button, clipboardUtils, InputText, TextArea } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import type { IProposalAction } from '../../proposalActionsDefinitions';

export interface IProposalActionsItemRawViewProps {
    /**
     * Proposal action to render the raw view for.
     */
    action: IProposalAction;
}

export const ProposalActionsItemRawView: React.FC<IProposalActionsItemRawViewProps> = (props) => {
    const { action } = props;

    const { copy } = useGukModulesContext();

    return (
        <div className="flex w-full flex-col gap-y-3">
            <InputText label={copy.proposalActionsItemRawView.to} value={action.to} disabled={true} />
            <InputText label={copy.proposalActionsItemRawView.value} value={action.value} disabled={true} />
            <TextArea label={copy.proposalActionsItemRawView.data} value={action.data} disabled={true} />
            <Button className="self-end" variant="tertiary" size="md" onClick={() => clipboardUtils.copy(action.data)}>
                {copy.proposalActionsItemRawView.copyButton}
            </Button>
        </div>
    );
};
