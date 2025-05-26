import classNames from 'classnames';
import { useMemo, useState, type ComponentProps } from 'react';
import { Accordion, Card, invariant } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import type { ProposalStatus } from '../../proposalUtils';
import { ProposalVotingStageContextProvider } from '../proposalVotingStageContext';
import { ProposalVotingStageStatus } from '../proposalVotingStageStatus';

export interface IProposalVotingStageProps extends ComponentProps<'div'> {
    /**
     * Status of the stage.
     */
    status: ProposalStatus;
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
    /**
     * Min advance date of the proposal in timestamp or ISO format.
     */
    minAdvance?: string | number;
    /**
     * Max advance date of the proposal in timestamp or ISO format.
     */
    maxAdvance?: string | number;
}

export const ProposalVotingStage: React.FC<IProposalVotingStageProps> = (props) => {
    const {
        name,
        status,
        startDate,
        endDate,
        index,
        children,
        isMultiStage,
        className,
        bodyList,
        minAdvance,
        maxAdvance,
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();

    // Initialise activeBody to the first body in the list when having only one body to directly display the body
    // overview instead of the body summary list
    const initialActiveBody = bodyList && bodyList.length === 1 ? bodyList[0] : undefined;
    const [activeBody, setActiveBody] = useState<string | undefined>(initialActiveBody);

    const contextValues = useMemo(() => ({ bodyList, activeBody, setActiveBody }), [bodyList, activeBody]);

    invariant(
        !isMultiStage || index != null,
        'ProposalVotingStage: component must be used inside a ProposalVotingContainer to work properly.',
    );

    if (!isMultiStage) {
        return (
            <ProposalVotingStageContextProvider value={contextValues}>
                <Card
                    className={classNames(
                        'relative flex flex-col gap-3 overflow-hidden p-4 md:gap-4 md:p-6',
                        className,
                    )}
                    {...otherProps}
                >
                    <div className="flex flex-col gap-y-1">
                        {name && (
                            <p className="text-base leading-tight font-normal text-neutral-800 md:text-lg">{name}</p>
                        )}
                        <ProposalVotingStageStatus
                            status={status}
                            endDate={endDate}
                            isMultiStage={false}
                            minAdvance={minAdvance}
                            maxAdvance={maxAdvance}
                        />
                    </div>
                    {children}
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
                            <p className="text-lg leading-tight font-normal text-neutral-800">{name}</p>
                            <ProposalVotingStageStatus
                                status={status}
                                endDate={endDate}
                                isMultiStage={true}
                                minAdvance={minAdvance}
                                maxAdvance={maxAdvance}
                            />
                        </div>
                        <p className="mt-1 text-sm leading-tight font-normal text-neutral-500">
                            {copy.proposalVotingStage.stage(index! + 1)}
                        </p>
                    </div>
                </Accordion.ItemHeader>
                <Accordion.ItemContent>{children}</Accordion.ItemContent>
            </Accordion.Item>
        </ProposalVotingStageContextProvider>
    );
};
