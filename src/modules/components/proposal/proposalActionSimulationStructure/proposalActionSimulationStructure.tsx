import classNames from 'classnames';
import { DateTime } from 'luxon';
import { AvatarIcon, Button, DataList, DefinitionList, IconType } from '../../../../core';
import { formatterUtils } from '../../../../core/utils/formatterUtils';
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
     * Simulation status and state
     */
    executionStatus: {
        label: string;
        isLoading?: boolean;
        isExecutable?: boolean;
    };
    /**
     * Callback when simulate again button is clicked
     */
    onSimulateAgain?: () => void;
    /**
     * Callback when view on tenderly button is clicked
     */
    onViewOnTenderly?: () => void;
    /**
     * Whether the simulate again button is in loading state
     */
    isSimulating?: boolean;
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
        executionStatus,
        onSimulateAgain,
        onViewOnTenderly,
        isSimulating = false,
        tenderlyUrl,
        className,
    } = props;

    const { copy } = useGukModulesContext();

    const handleSimulateAgain = () => {
        onSimulateAgain?.();
    };

    const handleViewOnTenderly = () => {
        if (tenderlyUrl) {
            window.open(tenderlyUrl, '_blank');
        } else {
            onViewOnTenderly?.();
        }
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
                    {formatSimulationDate(lastSimulation)}
                </DefinitionList.Item>

                <DefinitionList.Item term={copy.proposalActionSimulationStructure.executableTerm}>
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                            {executionStatus.isLoading ? (
                                <div className="flex size-6 items-center justify-center">
                                    <div className="size-5 animate-spin rounded-full border-2 border-neutral-100 border-t-neutral-500" />
                                </div>
                            ) : (
                                <div className="flex size-6 items-center justify-center">
                                    <AvatarIcon icon={IconType.CHECKMARK} size="sm" variant="success" />
                                </div>
                            )}
                            <span className="text-success-800 text-sm">{executionStatus.label}</span>
                        </div>
                    </div>
                </DefinitionList.Item>
            </DefinitionList.Container>

            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                <Button variant="secondary" size="md" onClick={handleSimulateAgain} isLoading={isSimulating}>
                    {copy.proposalActionSimulationStructure.simulateAgain}
                </Button>

                <Button variant="tertiary" size="md" onClick={handleViewOnTenderly} iconRight={IconType.LINK_EXTERNAL}>
                    {copy.proposalActionSimulationStructure.viewOnTenderly}
                </Button>
            </div>
        </DataList.Item>
    );
};
