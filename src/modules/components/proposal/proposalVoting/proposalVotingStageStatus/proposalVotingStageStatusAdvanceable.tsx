import classNames from 'classnames';
import { DateTime, Interval } from 'luxon';
import { useEffect, useState, type ComponentProps } from 'react';
import { DateFormat, formatterUtils, invariant, StatePingAnimation } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';

export interface IProposalVotingStageStatusAdvanceableProps extends ComponentProps<'div'> {
    /**
     * Min advance date of the proposal in timestamp or ISO format.
     */
    minAdvance?: string | number;
    /**
     * Max advance date of the proposal in timestamp or ISO format.
     */
    maxAdvance?: string | number;
}

const parseDate = (date: string | number) =>
    typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromMillis(date);

export const ProposalVotingStageStatusAdvanceable: React.FC<IProposalVotingStageStatusAdvanceableProps> = (props) => {
    const { minAdvance, maxAdvance, className, ...otherProps } = props;

    const [now, setNow] = useState(DateTime.now());

    invariant(
        minAdvance != null && maxAdvance != null,
        'ProposalVotingStageStatusAdvanceable: minAdvance and maxAdvance are required',
    );

    const { copy } = useGukModulesContext();

    const minAdvanceDate = parseDate(minAdvance);
    const maxAdvanceDate = parseDate(maxAdvance);

    const advanceWindow = Interval.fromDateTimes(minAdvanceDate, maxAdvanceDate);
    const isAdvanceableNow = advanceWindow.contains(now);

    const nextAdvanceDate = now < minAdvanceDate ? minAdvanceDate : now <= maxAdvanceDate ? maxAdvanceDate : undefined;

    const isShortWindow = nextAdvanceDate && nextAdvanceDate.diff(now, 'days').days <= 90;
    const isLongWindow = !isShortWindow && isAdvanceableNow;

    const mainText = copy.proposalVotingStageStatus.main.proposal;
    const secondaryText = copy.proposalVotingStageStatus.secondary.advanceable(isAdvanceableNow, isShortWindow);
    const statusText = copy.proposalVotingStageStatus.status.advanceable;

    // useEffect is needed to make sure that the component re-renders when state changes from advanceable in the future to advanceable now
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(DateTime.now());
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (!nextAdvanceDate && !isAdvanceableNow) {
        return null;
    }

    return (
        <div className={classNames('flex flex-row items-center gap-2', className)} {...otherProps}>
            <div className="flex flex-row gap-0.5">
                {(!isAdvanceableNow || isShortWindow) && (
                    <span className={isShortWindow ? 'text-primary-400' : 'text-neutral-800'}>
                        {formatterUtils.formatDate(nextAdvanceDate, { format: DateFormat.DURATION }) ?? '-'}
                    </span>
                )}
                {isLongWindow && <span className="text-neutral-800">{mainText}</span>}
                <span className="text-neutral-500">{secondaryText}</span>
                {isLongWindow && <span className="text-primary-400">{statusText}</span>}
            </div>
            {isAdvanceableNow && <StatePingAnimation variant="primary" />}
        </div>
    );
};
