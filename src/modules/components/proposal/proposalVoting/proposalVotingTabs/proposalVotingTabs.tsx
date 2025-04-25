import { useRef } from 'react';
import { Tabs, type ITabsRootProps } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingTabsProps extends ITabsRootProps {
    /**
     * Voting status of the proposal.
     */
    status: ProposalVotingStatus;
    /**
     * Hide the tab triggers for the specified tab IDs.
     */
    hideTabs?: ProposalVotingTab[];
    /**
     * Default proposal voting tab selected.
     * @default ProposalVotingTab.BREAKDOWN
     */
    defaultValue?: ProposalVotingTab;
}

export const ProposalVotingTabs: React.FC<IProposalVotingTabsProps> = (props) => {
    const { defaultValue = ProposalVotingTab.BREAKDOWN, hideTabs = [], status, children, ...otherProps } = props;

    const { copy } = useGukModulesContext();
    const contentRef = useRef<HTMLDivElement>(null);

    const isVotingActive = [ProposalVotingStatus.PENDING, ProposalVotingStatus.UNREACHED].includes(status);
    const tabs = [
        { id: ProposalVotingTab.BREAKDOWN, disabled: !isVotingActive },
        { id: ProposalVotingTab.VOTES, disabled: !isVotingActive },
        { id: ProposalVotingTab.DETAILS },
    ];

    return (
        <Tabs.Root defaultValue={defaultValue} className="flex flex-col gap-4 md:gap-6" {...otherProps}>
            <Tabs.List>
                {tabs
                    .filter(({ id }) => !hideTabs.includes(id))
                    .map(({ id, disabled }) => (
                        <Tabs.Trigger key={id} label={copy.proposalVotingTabs[id]} value={id} disabled={disabled} />
                    ))}
            </Tabs.List>
            <div className="flex grow flex-col" ref={contentRef}>
                {children}
            </div>
        </Tabs.Root>
    );
};
