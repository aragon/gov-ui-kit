import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import {
    AvatarIcon,
    Button,
    DataList,
    DateFormat,
    DefinitionList,
    formatterUtils,
    IconType,
    Spinner,
} from '../../../../core';
import { useGukModulesContext } from '../../gukModulesProvider';

export interface IProposalActionSimulationStructureProps {
    /**
     * Total number of actions in the proposal.
     */
    totalActions: number;
    /**
     * Last simulation date.
     */
    lastSimulation?: DateTime;
    /**
     * Whether simulation is currently running.
     */
    isSimulating?: boolean;
    /**
     * Whether the proposal can be simulated.
     */
    isSimulatable?: boolean;
    /**
     * Simulation status result.
     */
    status: 'success' | 'failure' | 'unknown';
    /**
     * Callback when simulate again button is clicked.
     */
    onSimulate?: () => void;
    /**
     * URL for tenderly simulation.
     */
    tenderlyUrl?: string;
    /**
     * Additional class names applied to the wrapper div.
     */
    className?: string;
    /**
     *
     * Optional error message to display.
     */
    error?: string;
}

export const ProposalActionSimulationStructure: React.FC<IProposalActionSimulationStructureProps> = (props) => {
    const {
        totalActions,
        lastSimulation,
        isSimulating,
        isSimulatable = true,
        status,
        onSimulate,
        tenderlyUrl,
        className,
        error,
    } = props;

    const { copy } = useGukModulesContext();
    const simulationCopy = copy.proposalActionSimulationStructure;

    const statusConfig = useMemo(() => {
        switch (status) {
            case 'success':
                return {
                    icon: IconType.CHECKMARK,
                    label: simulationCopy.likelyToSucceed,
                    textColor: 'text-success-800',
                    variant: 'success' as const,
                };
            case 'failure':
                return {
                    icon: IconType.CRITICAL,
                    label: simulationCopy.likelyToFail,
                    textColor: 'text-critical-800',
                    variant: 'critical' as const,
                };
            case 'unknown':
            default:
                return {
                    icon: IconType.INFO,
                    label: simulationCopy.unknown,
                    textColor: 'text-neutral-500',
                    variant: 'neutral' as const,
                };
        }
    }, [simulationCopy, status]);

    const formatSimulationDate = (date?: DateTime) => {
        if (!date) {
            return copy.proposalActionSimulationStructure.never;
        }

        const now = DateTime.now();
        const diffInDays = now.diff(date, 'days').days;

        return formatterUtils.formatDate(date, {
            format: diffInDays > 1 ? DateFormat.YEAR_MONTH_DAY_TIME : DateFormat.RELATIVE,
        });
    };

    return (
        <DataList.Item className={classNames('flex flex-col gap-4 p-4 pt-1 pb-4', className)}>
            <DefinitionList.Container>
                <DefinitionList.Item term={copy.proposalActionSimulationStructure.totalActionsTerm}>
                    {`${totalActions.toString()} ${totalActions !== 1 ? simulationCopy.actions : simulationCopy.action}`}
                </DefinitionList.Item>

                <DefinitionList.Item term={copy.proposalActionSimulationStructure.lastSimulationTerm}>
                    {isSimulating ? (
                        <span className="text-primary-400 flex items-center gap-2 md:gap-3">
                            <Spinner size="md" variant="primary" />
                            {simulationCopy.simulating}
                        </span>
                    ) : (
                        formatSimulationDate(lastSimulation)
                    )}
                </DefinitionList.Item>

                <DefinitionList.Item term={copy.proposalActionSimulationStructure.executableTerm}>
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                            {isSimulating ? (
                                <span className="text-primary-400 flex items-center gap-2 md:gap-3">
                                    <Spinner size="md" variant="primary" />
                                    {simulationCopy.simulating}
                                </span>
                            ) : (
                                <>
                                    <div className="flex size-6 items-center justify-center">
                                        <AvatarIcon icon={statusConfig.icon} size="sm" variant={statusConfig.variant} />
                                    </div>
                                    <span className={classNames('text-sm', statusConfig.textColor)}>
                                        {statusConfig.label}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </DefinitionList.Item>
            </DefinitionList.Container>

            <div
                className={classNames('flex flex-col gap-2 md:flex-row md:justify-between', {
                    'md:justify-end': !isSimulatable,
                })}
            >
                {isSimulatable && (
                    <Button variant="secondary" size="md" onClick={onSimulate} isLoading={isSimulating}>
                        {isSimulating
                            ? copy.proposalActionSimulationStructure.simulating
                            : lastSimulation
                              ? copy.proposalActionSimulationStructure.simulateAgain
                              : copy.proposalActionSimulationStructure.simulate}
                    </Button>
                )}

                <Button
                    variant="tertiary"
                    size="md"
                    disabled={!tenderlyUrl}
                    href={tenderlyUrl}
                    target="_blank"
                    iconRight={IconType.LINK_EXTERNAL}
                >
                    {copy.proposalActionSimulationStructure.viewOnTenderly}
                </Button>
            </div>
            {error && (
                <p className="text-critical-800 flex items-center gap-2 text-sm">
                    <AvatarIcon icon={IconType.INFO} size="sm" variant="critical" />
                    {error}
                </p>
            )}
        </DataList.Item>
    );
};
