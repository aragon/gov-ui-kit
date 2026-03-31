import classNames from 'classnames';
import { type ComponentProps, useEffect, useState } from 'react';
import { Avatar, Button, IconType } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalStatus } from '../../proposalUtils';
import { useProposalVotingContext } from '../proposalVotingContext';
import { type IProposalVotingBodyBrand, ProposalVotingTab } from '../proposalVotingDefinitions';
import { type IProposalVotingTabsProps, ProposalVotingTabs } from '../proposalVotingTabs';

export interface IProposalVotingBodyContentProps
    extends Pick<IProposalVotingTabsProps, 'hideTabs'>,
        ComponentProps<'div'> {
    /**
     * Status of the proposal.
     */
    status: ProposalStatus;
    /**
     * Name of the body.
     */
    name: string;
    /**
     * ID of the body used to determine if the content should be rendered or not, only relevant for multi-body proposals.
     */
    bodyId?: string;
    /**
     * Brand definitions of the body.
     */
    bodyBrand?: IProposalVotingBodyBrand;
}

export const ProposalVotingBodyContent: React.FC<IProposalVotingBodyContentProps> = (props) => {
    const { bodyId, children, name, status, hideTabs, bodyBrand, className, ...otherProps } = props;

    const { copy } = useGukModulesContext();
    const { bodyList, setActiveBody, activeBody } = useProposalVotingContext();

    const futureStatuses = [ProposalStatus.PENDING, ProposalStatus.UNREACHED];

    const stateActiveTab = futureStatuses.includes(status) ? ProposalVotingTab.DETAILS : ProposalVotingTab.BREAKDOWN;
    const [activeTab, setActiveTab] = useState<string | undefined>(stateActiveTab);

    // Update active tab when stage status changes (e.g from PENDING to UNREACHED)
    useEffect(() => setActiveTab(stateActiveTab), [stateActiveTab]);

    if (bodyId !== activeBody) {
        return null;
    }

    return (
        <div className={classNames('flex w-full flex-col', className)} {...otherProps}>
            {bodyList && bodyList.length > 1 && (
                <Button
                    className="mb-4 w-fit"
                    iconLeft={IconType.CHEVRON_LEFT}
                    onClick={() => setActiveBody?.(undefined)}
                    size="sm"
                    variant="tertiary"
                >
                    {copy.proposalVotingBodyContent.back}
                </Button>
            )}
            <div className="flex flex-col gap-4 gap-x-6 gap-y-1 md:flex-row md:items-center md:justify-between">
                <p className="truncate text-base text-neutral-800 md:text-lg">{name}</p>
                {bodyBrand != null && (
                    <div className="flex items-center gap-2 text-neutral-500 text-sm md:text-base">
                        <span>{bodyBrand.label}</span>
                        <Avatar size="sm" src={bodyBrand.logo} />
                    </div>
                )}
            </div>
            <ProposalVotingTabs hideTabs={hideTabs} onValueChange={setActiveTab} status={status} value={activeTab}>
                {children}
            </ProposalVotingTabs>
        </div>
    );
};
