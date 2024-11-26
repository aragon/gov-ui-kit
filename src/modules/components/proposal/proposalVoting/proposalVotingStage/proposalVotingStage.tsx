import classNames from 'classnames';
import { useMemo, useRef, useState, type ComponentProps } from 'react';
import { Accordion, Card, invariant } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import type { ProposalVotingStatus } from '../../proposalUtils';
import { ProposalVotingBodySummary } from '../proposalVotingBodySummary';
import { ProposalVotingStageContextProvider } from '../proposalVotingStageContext';
import { ProposalVotingStageStatus } from '../proposalVotingStageStatus';

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
    /**
     * List of plugin addresses of bodies.
     */
    bodyList?: string[];
}

export const ProposalVotingStage: React.FC<IProposalVotingStageProps> = (props) => {
    const {
        name,
        status,
        startDate,
        endDate,
        forceMount,
        index,
        children,
        isMultiStage,
        className,
        bodyList,
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();

    const [activeBody, setActiveBody] = useState<string | undefined>(
        bodyList && bodyList.length === 1 ? bodyList[0] : undefined,
    );

    const accordionContentRef = useRef<HTMLDivElement>(null);

    const contextValues = useMemo(
        () => ({ startDate, endDate, bodyList, activeBody, setActiveBody }),
        [startDate, endDate, bodyList, activeBody],
    );
    invariant(
        !isMultiStage || index != null,
        'ProposalVotingStage: component must be used inside a ProposalVotingContainer to work properly.',
    );

    const renderContent = () => {
        if (activeBody || !bodyList) {
            // Render children
            return children;
        }
        // Render ProposalVotingBodySummary when activeBody is null and bodyList has more than one element
        return <ProposalVotingBodySummary>{children}</ProposalVotingBodySummary>;
    };

    if (!isMultiStage) {
        return (
            <ProposalVotingStageContextProvider value={contextValues}>
                <Card
                    className={classNames(
                        'relative flex flex-col gap-4 overflow-hidden p-4 shadow-neutral md:gap-6 md:p-6',
                        className,
                    )}
                    {...otherProps}
                >
                    {bodyList && bodyList.length > 1 && (
                        <p className="text-lg font-normal leading-tight text-neutral-800">{name}</p>
                    )}
                    <ProposalVotingStageStatus
                        status={status}
                        endDate={endDate}
                        isMultiStage={false}
                        className={classNames({ 'md:absolute md:right-9 md:top-9': !bodyList })}
                    />
                    {renderContent()}
                </Card>
            </ProposalVotingStageContextProvider>
        );
    }

    return (
        <ProposalVotingStageContextProvider value={contextValues}>
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
                    {renderContent()}
                </Accordion.ItemContent>
            </Accordion.Item>
        </ProposalVotingStageContextProvider>
    );
};
