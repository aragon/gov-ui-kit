import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { Button } from '../../../../../core';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';
import { ProposalVotingTabs } from '../proposalVotingTabs';

export interface IProposalVotingBodyContentProps extends ComponentProps<'div'> {
    /**
     * Status of the stage.
     */
    status: ProposalVotingStatus;
    /**
     * Name of the proposal stage displayed for multi-stage proposals.
     */
    name?: string;
    /**
     * plugin address of the body used to determine if the content should be rendered or not.
     */
    bodyId?: string;
}

export const ProposalVotingBodyContent: React.FC<IProposalVotingBodyContentProps> = (props) => {
    const { bodyId, children, name, status } = props;

    const { bodyList, setActiveBody, activeBody } = useProposalVotingStageContext();

    const futureStatuses = [ProposalVotingStatus.PENDING, ProposalVotingStatus.UNREACHED];

    const stateActiveTab = futureStatuses.includes(status) ? ProposalVotingTab.DETAILS : ProposalVotingTab.BREAKDOWN;

    const [activeTab, setActiveTab] = useState<string | undefined>(stateActiveTab);

    // Update active tab when stage status changes (e.g from PENDING to UNREACHED)
    useEffect(() => setActiveTab(stateActiveTab), [stateActiveTab]);

    // Update active tab when status changes
    useEffect(() => {
        setActiveTab(stateActiveTab);
    }, [stateActiveTab]);

    const accordionContentRef = useRef<HTMLDivElement>(null);

    if (bodyId !== activeBody) {
        return null;
    }

    return (
        <div className="flex w-full flex-col gap-3">
            {bodyList && bodyList.length > 1 && (
                <>
                    <Button variant="tertiary" onClick={() => setActiveBody(undefined)} size="sm">
                        All bodies
                    </Button>
                    <p className="text-neutral-500">{name}</p>
                </>
            )}
            <ProposalVotingTabs
                value={activeTab}
                onValueChange={setActiveTab}
                status={status}
                accordionRef={accordionContentRef}
            >
                {children}
            </ProposalVotingTabs>
        </div>
    );
};
