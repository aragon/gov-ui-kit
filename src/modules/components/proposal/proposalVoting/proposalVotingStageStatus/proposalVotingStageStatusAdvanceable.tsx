import { DateFormat, formatterUtils, Rerender } from '../../../../../core';
import { useAdvanceable } from './hooks/useAdvanceable';

export interface IProposalVotingStageStatusAdvanceableProps {
    /**
     * Min advance date of the proposal in timestamp or ISO format.
     */
    minAdvance?: string | number;
    /**
     * Max advance date of the proposal in timestamp or ISO format.
     */
    maxAdvance?: string | number;
}

export const ProposalVotingStageStatusAdvanceable: React.FC<IProposalVotingStageStatusAdvanceableProps> = (props) => {
    const { minAdvance, maxAdvance } = props;

    const { isAdvanceableNow, nextAdvanceDateTime, isShortAdvanceWindow } = useAdvanceable(minAdvance, maxAdvance);

    const showDate = !!nextAdvanceDateTime && (!isAdvanceableNow || isShortAdvanceWindow);

    if (!nextAdvanceDateTime || !showDate) {
        return null;
    }

    return (
        <span className={isShortAdvanceWindow ? 'text-primary-400' : 'text-neutral-800'}>
            <Rerender>
                {() => formatterUtils.formatDate(nextAdvanceDateTime, { format: DateFormat.DURATION }) ?? '-'}
            </Rerender>
        </span>
    );
};
