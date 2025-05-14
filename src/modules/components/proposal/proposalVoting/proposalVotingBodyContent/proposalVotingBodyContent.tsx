import classNames from 'classnames';
import { useEffect, useState, type ComponentProps } from 'react';
import { Avatar, Button, IconType } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingTab, type IProposalVotingBodyBrand } from '../proposalVotingDefinitions';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';
import { ProposalVotingTabs, type IProposalVotingTabsProps } from '../proposalVotingTabs';

export interface IProposalVotingBodyContentProps
    extends Pick<IProposalVotingTabsProps, 'hideTabs'>,
        ComponentProps<'div'> {
    /**
     * Status of the stage.
     */
    status: ProposalVotingStatus;
    /**
     * Name of the body, only relevant for multi-body stages.
     */
    name?: string;
    /**
     * ID of the body used to determine if the content should be rendered or not, only relevant for multi-body stages.
     */
    bodyId?: string;
    /**
     * Branded identity assets for an external body.
     */
    bodyBrand?: IProposalVotingBodyBrand;
}

export const ProposalVotingBodyContent: React.FC<IProposalVotingBodyContentProps> = (props) => {
    const { bodyId, children, name, status, hideTabs, bodyBrand, className, ...otherProps } = props;

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
        <div className={classNames('flex w-full flex-col', className)} {...otherProps}>
            {bodyList && bodyList.length > 1 && (
                <Button
                    className="mb-4 w-fit"
                    iconLeft={IconType.CHEVRON_LEFT}
                    variant="tertiary"
                    size="sm"
                    onClick={() => setActiveBody?.(undefined)}
                >
                    {copy.proposalVotingBodyContent.back}
                </Button>
            )}
            <div className="flex flex-col gap-4 gap-x-6 gap-y-1 md:flex-row md:items-center md:justify-between">
                {name != null && <p className="truncate text-base text-neutral-800 md:text-lg">{name}</p>}
                {bodyBrand != null && (
                    <div className="flex items-center gap-2 text-sm text-neutral-500 md:text-base">
                        <span>{bodyBrand.label}</span>
                        <Avatar src={bodyBrand.logo} size="sm" />
                    </div>
                )}
            </div>
            <ProposalVotingTabs value={activeTab} onValueChange={setActiveTab} status={status} hideTabs={hideTabs}>
                {children}
            </ProposalVotingTabs>
        </div>
    );
};
