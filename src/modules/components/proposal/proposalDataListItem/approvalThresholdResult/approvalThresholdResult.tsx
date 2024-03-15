import { NumberFormat, Progress, formatterUtils } from '../../../../../core';
import { type IApprovalThresholdResult } from '../proposalDataListItemStructure';

export interface IApprovalThresholdResultProps extends IApprovalThresholdResult {}

/**
 * `ApprovalThresholdResult` component
 */
export const ApprovalThresholdResult: React.FC<IApprovalThresholdResultProps> = (props) => {
    const { approvalAmount, approvalThreshold } = props;
    const percentage = approvalThreshold !== 0 ? (approvalAmount / approvalThreshold) * 100 : 100;

    return (
        //  TODO: apply internationalization to Approved By, of, and Members [APP-2627]
        <div className="flex w-full flex-col gap-y-2 rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 shadow-neutral-sm md:gap-y-3 md:px-6 md:py-5">
            <div className="flex flex-1 gap-x-4 leading-tight text-neutral-800 md:gap-x-6 md:text-lg">
                <span className="flex-1">Approved By</span>
            </div>
            <Progress value={percentage} />
            <div className="flex gap-x-0.5 leading-tight text-neutral-500 md:gap-x-1 md:text-lg">
                <span className="text-primary-400">
                    {formatterUtils.formatNumber(approvalAmount, { format: NumberFormat.GENERIC_SHORT })}
                </span>
                <span>of</span>
                <span>{formatterUtils.formatNumber(approvalThreshold, { format: NumberFormat.GENERIC_SHORT })}</span>
                <span>Members</span>
            </div>
        </div>
    );
};
