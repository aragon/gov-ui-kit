import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState, type ComponentProps } from 'react';
import { Accordion, Card, invariant } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { ProposalVotingStageContextProvider } from '../proposalVotingStageContext';
import { ProposalVotingStageStatus } from '../proposalVotingStageStatus';
import { ProposalVotingTabs } from '../proposalVotingTabs';

export interface IProposalVotingStageProps extends ComponentProps<'div'> {
    /**
     * Status of the stage.
     */
    status: ProposalVotingStatus;
    /**
     * Start date of the stage in timestamp or ISO format.
     */
    startDate?: number | string;
    /**
     * Start date of the stage in timestamp or ISO format.
     */
    endDate?: number | string;
    /**
     * Name of the proposal stage displayed for multi-stage proposals.
     */
    name?: string;
    /**
     * Forces the multi-stage content to be rendered when set to true.
     */
    forceMount?: true;
    /**
     * Index of the stage set automatically by the ProposalVotingContainer for multi-stage proposals.
     */
    index?: number;
    /**
     * Defines if the proposal has multiple stages or not.
     */
    isMultiStage?: boolean;
}

export const ProposalVotingStage: React.FC<IProposalVotingStageProps> = (props) => {
    const { name, status, startDate, endDate, forceMount, index, children, isMultiStage, className, ...otherProps } =
        props;

    const { copy } = useGukModulesContext();

    const futureStatuses = [ProposalVotingStatus.PENDING, ProposalVotingStatus.UNREACHED];
    const stateActiveTab = futureStatuses.includes(status) ? ProposalVotingTab.DETAILS : ProposalVotingTab.BREAKDOWN;

    const [activeTab, setActiveTab] = useState<string | undefined>(stateActiveTab);

    // Update active tab when stage status changes (e.g from PENDING to UNREACHED)
    useEffect(() => setActiveTab(stateActiveTab), [stateActiveTab]);

    const accordionContentRef = useRef<HTMLDivElement>(null);

    const contextValues = useMemo(() => ({ startDate, endDate }), [startDate, endDate]);

    invariant(
        !isMultiStage || index != null,
        'ProposalVotingStage: component must be used inside a ProposalVotingContainer to work properly.',
    );

    if (!isMultiStage) {
        return (
            <Card
                className={classNames('relative flex flex-col gap-4 overflow-hidden p-4 md:gap-6 md:p-6', className)}
                {...otherProps}
            >
                <ProposalVotingStageStatus
                    status={status}
                    endDate={endDate}
                    isMultiStage={false}
                    className="md:absolute md:right-9 md:top-9"
                />
                <ProposalVotingTabs
                    status={status}
                    value={activeTab}
                    onValueChange={setActiveTab}
                    accordionRef={accordionContentRef}
                >
                    <ProposalVotingStageContextProvider value={contextValues}>
                        {children}
                    </ProposalVotingStageContextProvider>
                </ProposalVotingTabs>
            </Card>
        );
    }

    return (
        <Accordion.Item value={index!.toString()} {...otherProps}>
            <Accordion.ItemHeader>
                <div className="flex grow flex-row justify-between gap-4 md:gap-6">
                    <div className="flex flex-col items-start gap-1">
                        <p className="text-lg font-normal leading-tight text-neutral-800">{name}</p>
                        <ProposalVotingStageStatus status={status} endDate={endDate} isMultiStage={true} />
                    </div>
                    <p className="mt-1 text-sm font-normal leading-tight text-neutral-500">
                        {copy.proposalVotingStage.stage(index! + 1)}
                    </p>
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent ref={accordionContentRef} forceMount={forceMount}>
                <ProposalVotingTabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    status={status}
                    accordionRef={accordionContentRef}
                >
                    <ProposalVotingStageContextProvider value={contextValues}>
                        {children}
                    </ProposalVotingStageContextProvider>
                </ProposalVotingTabs>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
