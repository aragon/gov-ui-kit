import classNames from 'classnames';
import { useEffect, useState, type ComponentProps } from 'react';
import { Button, IconType } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
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
    const { bodyId, children, name, status, ...otherProps } = props;
    const { className } = otherProps;

    const { copy } = useGukModulesContext();

    const { bodyList, setActiveBody, activeBody } = useProposalVotingStageContext();

    const futureStatuses = [ProposalVotingStatus.PENDING, ProposalVotingStatus.UNREACHED];

    const stateActiveTab = futureStatuses.includes(status) ? ProposalVotingTab.DETAILS : ProposalVotingTab.BREAKDOWN;

    const [activeTab, setActiveTab] = useState<string | undefined>(stateActiveTab);

    // Update active tab when stage status changes (e.g from PENDING to UNREACHED)
    useEffect(() => setActiveTab(stateActiveTab), [stateActiveTab]);

    if (bodyId !== activeBody) {
        return null;
    }

    return (
        <div className={classNames('flex w-full flex-col gap-3', className)} {...otherProps}>
            {bodyList && bodyList.length > 1 && (
                <>
                    <Button
                        className="w-fit"
                        iconLeft={IconType.CHEVRON_LEFT}
                        variant="tertiary"
                        onClick={() => setActiveBody?.(undefined)}
                        size="sm"
                    >
                        {copy.proposalVotingBodyContent.back}
                    </Button>
                    <p className="text-neutral-500">{name}</p>
                </>
            )}
            <ProposalVotingTabs value={activeTab} onValueChange={setActiveTab} status={status}>
                {children}
            </ProposalVotingTabs>
        </div>
    );
};
