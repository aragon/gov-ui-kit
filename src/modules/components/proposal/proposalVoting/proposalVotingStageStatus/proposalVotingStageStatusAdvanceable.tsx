import classNames from 'classnames';
import { DateTime, Interval } from 'luxon';
import type { ComponentProps } from 'react';
import { DateFormat, formatterUtils, Rerender, StatePingAnimation } from '../../../../../core';
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

const parseDate = (date?: string | number): DateTime => {
    if (typeof date === 'string') {
        return DateTime.fromISO(date);
    }
    if (typeof date === 'number') {
        return DateTime.fromMillis(date);
    }
    return DateTime.invalid('missing-input');
};

export const ProposalVotingStageStatusAdvanceable: React.FC<IProposalVotingStageStatusAdvanceableProps> = (props) => {
    const { minAdvance, maxAdvance, className, ...otherProps } = props;
    const { copy } = useGukModulesContext();

    const now = DateTime.now();
    const minAdvanceDate = parseDate(minAdvance);
    const maxAdvanceDate = parseDate(maxAdvance);

    const advanceWindow =
        minAdvanceDate.isValid && maxAdvanceDate.isValid
            ? Interval.fromDateTimes(minAdvanceDate, maxAdvanceDate)
            : undefined;

    const isAdvanceableNow = advanceWindow?.contains(now) ?? false;

    const nextAdvanceDate = now < minAdvanceDate ? minAdvanceDate : now <= maxAdvanceDate ? maxAdvanceDate : undefined;

    const isShortWindow = nextAdvanceDate?.isValid && nextAdvanceDate.diff(now, 'days').days <= 90;
    const isLongWindow = !isShortWindow && isAdvanceableNow;

    const mainText = copy.proposalVotingStageStatus.main.proposal;
    const secondaryText = copy.proposalVotingStageStatus.secondary.advanceable(isAdvanceableNow, isShortWindow);
    const statusText = copy.proposalVotingStageStatus.status.advanceable;

    if (!nextAdvanceDate && !isAdvanceableNow) {
        return null;
    }

    return (
        <div className={classNames('flex flex-row items-center gap-2', className)} {...otherProps}>
            <div className="flex flex-row gap-0.5">
                {(!isAdvanceableNow || isShortWindow) && (
                    <span className={isShortWindow ? 'text-primary-400' : 'text-neutral-800'}>
                        <Rerender>
                            {() => formatterUtils.formatDate(nextAdvanceDate, { format: DateFormat.DURATION }) ?? '-'}
                        </Rerender>
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
