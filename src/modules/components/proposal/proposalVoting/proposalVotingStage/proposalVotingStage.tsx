import classNames from 'classnames';
import { useMemo, useRef, type ComponentProps } from 'react';
import { Accordion, invariant } from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalVotingStatus, ProposalVotingTab } from '../proposalVotingDefinitions';
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
    startDate: number | string;
    /**
     * Start date of the stage in timestamp or ISO format.
     */
    endDate: number | string;
    /**
     * Default tab displayed for the current stage. Defaults to details tab for pending and unreached states and to
     * breakdown tab for active, accepted and rejected states.
     */
    defaultTab?: ProposalVotingTab;
    /**
     * Name of the proposal stage displayed for multi-stage proposals.
     */
    name?: string;
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
    const { name, status, startDate, endDate, defaultTab, index, children, isMultiStage, className, ...otherProps } =
        props;

    const { copy } = useOdsModulesContext();

    const stateDefaultTab = [ProposalVotingStatus.PENDING, ProposalVotingStatus.UNREACHED].includes(status)
        ? ProposalVotingTab.DETAILS
        : ProposalVotingTab.BREAKDOWN;
    const processedDefaultTab = defaultTab ?? stateDefaultTab;

    const accordionContentRef = useRef<HTMLDivElement>(null);

    const contextValues = useMemo(() => ({ startDate, endDate }), [startDate, endDate]);

    invariant(
        !isMultiStage || index != null,
        'ProposalVotingStage: component must be used inside a ProposalVotingContainer to work properly.',
    );

    if (!isMultiStage) {
        return (
            <div className={classNames('flex flex-col gap-4 md:gap-6', className)}>
                <ProposalVotingStageStatus status={status} endDate={endDate} isMultiStage={false} />
                <ProposalVotingTabs defaultValue={processedDefaultTab} accordionRef={accordionContentRef}>
                    <ProposalVotingStageContextProvider value={contextValues}>
                        {children}
                    </ProposalVotingStageContextProvider>
                </ProposalVotingTabs>
            </div>
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
            <Accordion.ItemContent ref={accordionContentRef}>
                <ProposalVotingTabs defaultValue={processedDefaultTab} accordionRef={accordionContentRef}>
                    <ProposalVotingStageContextProvider value={contextValues}>
                        {children}
                    </ProposalVotingStageContextProvider>
                </ProposalVotingTabs>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
