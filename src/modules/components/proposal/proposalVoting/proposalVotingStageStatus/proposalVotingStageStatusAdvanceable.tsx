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
    /**
     * The main text to show - Proposal/Stage
     */
    mainText: string;
}

const parseDate = (input?: string | number): DateTime => {
    if (typeof input === 'string') {
        return DateTime.fromISO(input);
    }
    if (typeof input === 'number') {
        return DateTime.fromMillis(input);
    }
    return DateTime.invalid('missing-input');
};

const renderDuration = (date?: DateTime) => (
    <Rerender>{() => formatterUtils.formatDate(date, { format: DateFormat.DURATION }) ?? '-'}</Rerender>
);

export const ProposalVotingStageStatusAdvanceable: React.FC<IProposalVotingStageStatusAdvanceableProps> = (props) => {
    const { mainText, minAdvance, maxAdvance, className, ...otherProps } = props;
    const { copy } = useGukModulesContext();

    const now = DateTime.now();
    const minAdvanceDate = parseDate(minAdvance);
    const maxAdvanceDate = parseDate(maxAdvance);

    const advanceWindow =
        minAdvanceDate.isValid && maxAdvanceDate.isValid
            ? Interval.fromDateTimes(minAdvanceDate, maxAdvanceDate)
            : undefined;

    const isAdvanceableNow = advanceWindow?.contains(now) ?? false;

    const nextAdvanceDateTime =
        now < minAdvanceDate ? minAdvanceDate : now <= maxAdvanceDate ? maxAdvanceDate : undefined;

    const isShortWindow = nextAdvanceDateTime?.isValid && nextAdvanceDateTime.diff(now, 'days').days <= 90;
    const isLongWindow = !isShortWindow && isAdvanceableNow;

    const secondaryText = copy.proposalVotingStageStatus.secondary.advanceable(isAdvanceableNow, isShortWindow);
    const statusText = copy.proposalVotingStageStatus.status.advanceable;

    if (!nextAdvanceDateTime && !isAdvanceableNow) {
        return null;
    }

    return (
        <div className={classNames('flex flex-row items-center gap-2', className)} {...otherProps}>
            <div className="flex flex-row gap-0.5">
                {!isAdvanceableNow && <span className="text-neutral-800">{renderDuration(nextAdvanceDateTime)}</span>}
                {isShortWindow && <span className="text-primary-400">{renderDuration(nextAdvanceDateTime)}</span>}
                {isLongWindow && <span className="text-neutral-800">{mainText}</span>}
                <span className="text-neutral-500">{secondaryText}</span>
                {isLongWindow && <span className="text-primary-400">{statusText}</span>}
            </div>
            {isAdvanceableNow && <StatePingAnimation variant="primary" />}
        </div>
    );
};
