import classNames from 'classnames';
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
import type { IActionSimulationProps } from './actionSimulation.api';

export const ActionSimulation: React.FC<IActionSimulationProps> = (props) => {
    const { totalActions, lastSimulation, isLoading, isEnabled = true, onSimulate, className, error } = props;

    const { copy } = useGukModulesContext();
    const simulationCopy = copy.actionSimulation;

    const statusConfig = useMemo(() => {
        switch (lastSimulation?.status) {
            case 'success':
                return {
                    icon: IconType.CHECKMARK,
                    label: simulationCopy.likelyToSucceed,
                    textColor: 'text-success-800',
                    variant: 'success' as const,
                };
            case 'failed':
                return {
                    icon: IconType.CRITICAL,
                    label: simulationCopy.likelyToFail,
                    textColor: 'text-critical-800',
                    variant: 'critical' as const,
                };
            default:
                return {
                    icon: IconType.INFO,
                    label: simulationCopy.unknown,
                    textColor: 'text-neutral-500',
                    variant: 'neutral' as const,
                };
        }
    }, [simulationCopy, lastSimulation?.status]);

    const formattedTimestamp =
        formatterUtils.formatDate(lastSimulation?.timestamp, {
            format: DateFormat.YEAR_MONTH_DAY_TIME,
        }) ?? simulationCopy.never;

    return (
        <DataList.Item className={classNames('flex flex-col gap-4 p-4 pt-1 pb-4', className)}>
            <DefinitionList.Container>
                <DefinitionList.Item term={copy.actionSimulation.totalActionsTerm}>
                    {`${totalActions.toString()} ${totalActions !== 1 ? simulationCopy.actions : simulationCopy.action}`}
                </DefinitionList.Item>

                <DefinitionList.Item term={copy.actionSimulation.lastSimulationTerm}>
                    {isLoading ? (
                        <span className="text-primary-400 flex items-center gap-2 md:gap-3">
                            <Spinner size="md" variant="primary" />
                            {simulationCopy.simulating}
                        </span>
                    ) : (
                        <span className="inline-block first-letter:capitalize">{formattedTimestamp}</span>
                    )}
                </DefinitionList.Item>

                <DefinitionList.Item term={copy.actionSimulation.executableTerm}>
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                            {isLoading ? (
                                <span className="text-primary-400 flex items-center gap-2 md:gap-3">
                                    <Spinner size="md" variant="primary" />
                                    {simulationCopy.simulating}
                                </span>
                            ) : (
                                <>
                                    <div className="flex size-6 items-center justify-center">
                                        <AvatarIcon icon={statusConfig.icon} size="sm" variant={statusConfig.variant} />
                                    </div>
                                    <span className={classNames('text-sm md:text-base', statusConfig.textColor)}>
                                        {statusConfig.label}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </DefinitionList.Item>
            </DefinitionList.Container>

            <div className={classNames('flex flex-col gap-2 md:flex-row md:justify-between')}>
                {isEnabled && (
                    <Button variant="secondary" size="md" onClick={onSimulate} isLoading={isLoading}>
                        {isLoading
                            ? copy.actionSimulation.simulating
                            : lastSimulation
                              ? copy.actionSimulation.simulateAgain
                              : copy.actionSimulation.simulate}
                    </Button>
                )}

                <Button
                    variant="tertiary"
                    size="md"
                    disabled={!lastSimulation?.url}
                    href={lastSimulation?.url}
                    target="_blank"
                    iconRight={IconType.LINK_EXTERNAL}
                >
                    {copy.actionSimulation.viewOnTenderly}
                </Button>
            </div>
            {error && (
                <div className="text-critical-800 flex items-center gap-2 text-sm">
                    <AvatarIcon icon={IconType.INFO} size="sm" variant="critical" />
                    {error}
                </div>
            )}
        </DataList.Item>
    );
};
