import { Tabs, type ITabsRootProps } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalStatus } from '../../proposalUtils';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingTabsProps extends ITabsRootProps {
    /**
     * Voting status of the proposal.
     */
    status: ProposalStatus;
    /**
     * Hides the triggers for the specified tab IDs when set.
     */
    hideTabs?: ProposalVotingTab[];
    /**
     * Default proposal voting tab selected.
     * @default ProposalVotingTab.BREAKDOWN
     */
    defaultValue?: ProposalVotingTab;
}

export const ProposalVotingTabs: React.FC<IProposalVotingTabsProps> = (props) => {
    const { defaultValue = ProposalVotingTab.BREAKDOWN, hideTabs, status, children, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const isVotingActive = ![ProposalStatus.PENDING, ProposalStatus.UNREACHED].includes(status);

    const tabs = [
        { id: ProposalVotingTab.BREAKDOWN, disabled: !isVotingActive },
        { id: ProposalVotingTab.VOTES, disabled: !isVotingActive },
        { id: ProposalVotingTab.DETAILS },
    ];

    const filteredTabs = tabs.filter(({ id }) => !hideTabs?.includes(id));

    return (
        <Tabs.Root defaultValue={defaultValue} className="flex flex-col gap-4 md:gap-6" {...otherProps}>
            <Tabs.List>
                {filteredTabs.map(({ id, disabled }) => (
                    <Tabs.Trigger key={id} label={copy.proposalVotingTabs[id]} value={id} disabled={disabled} />
                ))}
            </Tabs.List>
            <div className="flex grow flex-col">{children}</div>
        </Tabs.Root>
    );
};
