import { DateTime } from 'luxon';
import { Button, DefinitionList, Icon, IconType } from '../../../../core';
import { formatterUtils } from '../../../../core/utils/formatterUtils';

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
    } = props;

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
            return null;
        }
        
        const dateTime = typeof date === 'string' 
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
        <div className="flex flex-col gap-4 p-4 pt-1 pb-4">
            <DefinitionList.Container>
                <DefinitionList.Item term="Total actions">
                    {`${totalActions.toString()} action${totalActions !== 1 ? 's' : ''}`}
                </DefinitionList.Item>
                
                <DefinitionList.Item term="Last simulation">
                    {formatSimulationDate(lastSimulation) ?? 'No simulation yet'}
                </DefinitionList.Item>
                
                <DefinitionList.Item term="Executable">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            {executionStatus.isLoading ? (
                                <div className="size-6 flex items-center justify-center">
                                    <div className="size-5 border-2 border-neutral-100 border-t-neutral-500 rounded-full animate-spin" />
                                </div>
                            ) : (
                                <div className="size-6 flex items-center justify-center">
                                    <Icon 
                                        icon={IconType.SUCCESS} 
                                        size="md" 
                                        className={executionStatus.isExecutable ? 'text-success-500' : 'text-neutral-400'} 
                                    />
                                </div>
                            )}
                            <span className="text-sm text-neutral-500">
                                {executionStatus.label}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-500">Label</span>
                            <Icon icon={IconType.LINK_EXTERNAL} size="sm" className="text-neutral-500" />
                        </div>
                    </div>
                </DefinitionList.Item>
            </DefinitionList.Container>

            <div className="flex flex-col gap-2">
                <Button
                    variant="secondary"
                    size="md"
                    onClick={handleSimulateAgain}
                    isLoading={isSimulating}
                    className="w-full"
                >
                    Simulate again
                </Button>
                
                <Button
                    variant="tertiary"
                    size="md"
                    onClick={handleViewOnTenderly}
                    iconRight={IconType.LINK_EXTERNAL}
                    className="w-full"
                >
                    View on tenderly
                </Button>
            </div>
        </div>
    );
};
