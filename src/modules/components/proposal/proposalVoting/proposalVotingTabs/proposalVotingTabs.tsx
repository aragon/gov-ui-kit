import { useRef, type RefObject } from 'react';
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
    /**
     * Reference object of the parent accordion component (on multi-stage proposals) to update its height on tab change.
     */
    accordionRef?: RefObject<HTMLDivElement>;
}

export const ProposalVotingTabs: React.FC<IProposalVotingTabsProps> = (props) => {
    const { defaultValue = ProposalVotingTab.BREAKDOWN, accordionRef, children, status, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const contentRef = useRef<HTMLDivElement>(null);

    const handleTabClick = () => {
        if (accordionRef?.current == null || contentRef?.current == null) {
            return;
        }

        const { clientHeight } = contentRef.current;
        const { style } = accordionRef.current;

        style.setProperty('--radix-collapsible-content-height', clientHeight.toString());
    };

    const isVotingActive = status !== ProposalVotingStatus.PENDING && status !== ProposalVotingStatus.UNREACHED;

    return (
        <Tabs.Root defaultValue={defaultValue} className="flex flex-col gap-4 md:gap-6" {...otherProps}>
            <Tabs.List>
                <Tabs.Trigger
                    label={copy.proposalVotingTabs.breakdown}
                    value={ProposalVotingTab.BREAKDOWN}
                    disabled={!isVotingActive}
                    onClick={handleTabClick}
                />
                <Tabs.Trigger
                    label={copy.proposalVotingTabs.votes}
                    value={ProposalVotingTab.VOTES}
                    disabled={!isVotingActive}
                    onClick={handleTabClick}
                />
                <Tabs.Trigger
                    label={copy.proposalVotingTabs.details}
                    value={ProposalVotingTab.DETAILS}
                    onClick={handleTabClick}
                />
            </Tabs.List>
            <div className="flex grow flex-col" ref={contentRef}>
                {children}
            </div>
        </Tabs.Root>
    );
};
