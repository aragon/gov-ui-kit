import { Progress } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { type IMajorityVotingResult } from '../proposalDataListItemStructure';

export interface IMajorityVotingResultProps extends IMajorityVotingResult {}

/**
 * `MajorityVotingResult` component
 */
export const MajorityVotingResult: React.FC<IMajorityVotingResultProps> = (props) => {
    const { option, stage, voteAmount, votePercentage } = props;

    const { copy } = useGukModulesContext();

    return (
        <div className="flex w-full flex-col gap-y-2 rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 shadow-neutral-sm md:gap-y-3 md:px-6 md:py-5">
            <div className="flex flex-1 gap-x-4 leading-tight text-neutral-800 md:gap-x-6 md:text-lg">
                <span className="line-clamp-1 flex-1">{stage?.title ?? copy.majorityVotingResult.winningOption}</span>
                {stage?.id == null && <span className="text-primary-400">{`${votePercentage}%`}</span>}
                {stage?.id != null && (
                    <span className="flex shrink-0 justify-between gap-x-0.5">
                        <span className="flex-1 text-neutral-500">{copy.majorityVotingResult.stage}</span>
                        {stage.id}
                    </span>
                )}
            </div>
            <Progress value={votePercentage} />
            <div className="flex gap-x-4 leading-tight md:gap-x-6 md:text-lg">
                <span className="capitalize text-primary-400">{option}</span>
                <span className="flex-1 text-right text-neutral-500">{voteAmount}</span>
            </div>
        </div>
    );
};
