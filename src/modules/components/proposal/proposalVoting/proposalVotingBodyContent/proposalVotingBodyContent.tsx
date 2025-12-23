import classNames from 'classnames';
import { useState, type ComponentProps } from 'react';
import { Avatar, Button, IconType } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalStatus } from '../../proposalUtils';
import { useProposalVotingContext } from '../proposalVotingContext';
import { ProposalVotingTab, type IProposalVotingBodyBrand } from '../proposalVotingDefinitions';
import { ProposalVotingTabs, type IProposalVotingTabsProps } from '../proposalVotingTabs';

export interface IProposalVotingBodyContentProps
    extends Pick<IProposalVotingTabsProps, 'hideTabs'>, ComponentProps<'div'> {
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

    const isFutureStatus = futureStatuses.includes(status);
    const [activeTab, setActiveTab] = useState<string>(ProposalVotingTab.BREAKDOWN);
    const effectiveTab = isFutureStatus ? ProposalVotingTab.DETAILS : activeTab;

    const handleTabChange = (tab?: string) => {
        if (!isFutureStatus && tab != null) {
            setActiveTab(tab);
        }
    };

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
                <p className="truncate text-base text-neutral-800 md:text-lg">{name}</p>
                {bodyBrand != null && (
                    <div className="flex items-center gap-2 text-sm text-neutral-500 md:text-base">
                        <span>{bodyBrand.label}</span>
                        <Avatar src={bodyBrand.logo} size="sm" />
                    </div>
                )}
            </div>
            <ProposalVotingTabs
                value={effectiveTab}
                onValueChange={handleTabChange}
                status={status}
                hideTabs={hideTabs}
            >
                {children}
            </ProposalVotingTabs>
        </div>
    );
};
