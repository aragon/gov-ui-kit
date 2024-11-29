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
     * Default proposal voting tab selected.
     * @default ProposalVotingTab.BREAKDOWN
     */
    defaultValue?: ProposalVotingTab;
}

export const ProposalVotingTabs: React.FC<IProposalVotingTabsProps> = (props) => {
    const { defaultValue = ProposalVotingTab.BREAKDOWN, children, status, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const contentRef = useRef<HTMLDivElement>(null);

    const isVotingActive = status !== ProposalVotingStatus.PENDING && status !== ProposalVotingStatus.UNREACHED;

    return (
        <Tabs.Root defaultValue={defaultValue} className="flex flex-col gap-4 md:gap-6" {...otherProps}>
            <Tabs.List>
                <Tabs.Trigger
                    label={copy.proposalVotingTabs.breakdown}
                    value={ProposalVotingTab.BREAKDOWN}
                    disabled={!isVotingActive}
                />
                <Tabs.Trigger
                    label={copy.proposalVotingTabs.votes}
                    value={ProposalVotingTab.VOTES}
                    disabled={!isVotingActive}
                />
                <Tabs.Trigger label={copy.proposalVotingTabs.details} value={ProposalVotingTab.DETAILS} />
            </Tabs.List>
            <div className="flex grow flex-col" ref={contentRef}>
                {children}
            </div>
        </Tabs.Root>
    );
};
