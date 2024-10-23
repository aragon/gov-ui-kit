import { NumberFormat, Progress, formatterUtils } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { type IApprovalThresholdResult } from '../proposalDataListItemStructure';

export interface IApprovalThresholdResultProps extends IApprovalThresholdResult {}

/**
 * `ApprovalThresholdResult` component
 */
export const ApprovalThresholdResult: React.FC<IApprovalThresholdResultProps> = (props) => {
    const { approvalAmount, approvalThreshold, stage } = props;
    const percentage = approvalThreshold !== 0 ? (approvalAmount / approvalThreshold) * 100 : 100;

    const { copy } = useGukModulesContext();

    const formattedApprovalThreshold = formatterUtils.formatNumber(approvalThreshold, {
        format: NumberFormat.GENERIC_SHORT,
    })!;

    return (
        <div className="flex w-full flex-col gap-y-2 rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 shadow-neutral-sm md:gap-y-3 md:px-6 md:py-5">
            <div className="flex flex-1 gap-x-3 leading-tight text-neutral-800 md:gap-x-6 md:text-lg">
                <span className="line-clamp-1 flex-1">{stage?.title ?? 'Approved By'}</span>
                {stage?.id != null && (
                    <span className="flex shrink-0 justify-between gap-x-0.5">
                        <span className="flex-1 text-neutral-500">{copy.approvalThresholdResult.stage}</span>
                        {stage.id}
                    </span>
                )}
            </div>
            <Progress value={percentage} />
            <div className="flex gap-x-0.5 leading-tight text-neutral-500 md:gap-x-1 md:text-lg">
                <span className="text-primary-400">
                    {formatterUtils.formatNumber(approvalAmount, { format: NumberFormat.GENERIC_SHORT })}
                </span>
                <span>{copy.approvalThresholdResult.outOf(formattedApprovalThreshold)}</span>
            </div>
        </div>
    );
};
