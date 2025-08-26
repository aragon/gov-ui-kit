import classNames from 'classnames';
import { DateTime } from 'luxon';
import { AvatarIcon, Button, DataList, DefinitionList, formatterUtils, IconType, Spinner } from '../../../../core';
import { useGukModulesContext } from '../../gukModulesProvider';

export interface IProposalActionSimulationStructureProps {
    /**
     * Total number of actions in the proposal
     */
    totalActions: number;
    /**
     * Last simulation date
     */
    lastSimulation?: DateTime | string | number;
    /**
     * Whether simulation is currently running
     */
    isSimulating?: boolean;
    /**
     * Simulation status result
     */
    status: 'success' | 'failure' | 'unknown';
    /**
     * Callback when simulate again button is clicked
     */
    onSimulateAgain?: () => void;
    /**
     * URL for tenderly simulation
     */
    tenderlyUrl?: string;
    /**
     * Additional class names applied to the wrapper div.
     */
    className?: string;
}

export const ProposalActionSimulationStructure: React.FC<IProposalActionSimulationStructureProps> = (props) => {
    const {
        totalActions,
        lastSimulation,
        isSimulating = false,
        status,
        onSimulateAgain,
        tenderlyUrl,
        className,
    } = props;

    const { copy } = useGukModulesContext();
    const simulationCopy = copy.proposalActionSimulationStructure;

    const getStatusConfig = () => {
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
                    label: 'Not simulated',
                    textColor: 'text-neutral-500',
                    variant: 'neutral' as const,
                };
        }
    };

    const statusConfig = getStatusConfig();

    const handleSimulateAgain = () => {
        onSimulateAgain?.();
    };

    const formatSimulationDate = (date?: DateTime | string | number) => {
        if (!date) {
            return copy.proposalActionSimulationStructure.never;
        }

        const dateTime =
            typeof date === 'string'
                ? DateTime.fromISO(date)
                : typeof date === 'number'
                  ? DateTime.fromMillis(date)
                  : date;

        const now = DateTime.now();
        const diffInHours = now.diff(dateTime, 'hours').hours;
        const diffInDays = now.diff(dateTime, 'days').days;

        if (diffInHours < 1) {
            return 'Now';
        } else if (diffInDays < 1) {
            const hours = Math.floor(diffInHours);
            return `${hours.toString()} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diffInDays < 7) {
            const days = Math.floor(diffInDays);
            return `${days.toString()} day${days > 1 ? 's' : ''} ago`;
        } else {
            return formatterUtils.formatDate(dateTime);
        }
    };

    return (
        <DataList.Item className={classNames('flex flex-col gap-4 p-4 pt-1 pb-4', className)}>
            <DefinitionList.Container>
                <DefinitionList.Item term={copy.proposalActionSimulationStructure.totalActionsTerm}>
                    {`${totalActions.toString()} action${totalActions !== 1 ? 's' : ''}`}
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
                                <div className="flex size-6 items-center justify-center">
                                    <AvatarIcon icon={statusConfig.icon} size="sm" variant={statusConfig.variant} />
                                </div>
                            )}
                            <span className={classNames('text-sm', statusConfig.textColor)}>{statusConfig.label}</span>
                        </div>
                    </div>
                </DefinitionList.Item>
            </DefinitionList.Container>

            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                <Button variant="secondary" size="md" onClick={handleSimulateAgain} isLoading={isSimulating}>
                    {copy.proposalActionSimulationStructure.simulateAgain}
                </Button>

                <Button
                    variant="tertiary"
                    size="md"
                    href={tenderlyUrl}
                    target="_blank"
                    iconRight={IconType.LINK_EXTERNAL}
                >
                    {copy.proposalActionSimulationStructure.viewOnTenderly}
                </Button>
            </div>
        </DataList.Item>
    );
};
