import classNames from 'classnames';
import {
    AvatarIcon,
    formatterUtils,
    IconType,
    NumberFormat,
    Progress,
    type IProgressProps,
    type ProgressVariant,
} from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';

export interface IProposalVotingProgressItemDescription {
    /**
     * Value of the description highlighted (e.g. current vote amount)
     */
    value: string | number | null;
    /**
     * Text of the description (e.g. minimum required vote amount)
     */
    text: string;
}

export interface IProposalVotingProgressItemProps extends Omit<IProgressProps, 'variant' | 'size'> {
    /**
     * Name of the voting progress.
     */
    name: string;
    /**
     * Additional description of the name of the voting progress, displayed after the name.
     */
    nameDescription?: string;
    /**
     * Variant of the voting progress item component.
     * @default 'default'
     */
    variant?: 'default' | 'critical' | 'success';
    /**
     * Description of the voting progress displayed below the progress bar.
     */
    description: IProposalVotingProgressItemDescription;
    /**
     * Displays the progress bar value as percentage when set to true.
     */
    showPercentage?: boolean;
    /**
     * Displays a status icon and text based on the progress bar and indicator values when set to true. The component
     * renders a "success" status when value is equal or greater than indicator, and a "failed" status otherwise.
     */
    showStatus?: boolean;
}

const variantToNameClassNames: Record<ProgressVariant, string> = {
    critical: 'text-critical-800',
    primary: 'text-primary-400',
    neutral: 'text-neutral-800',
    success: 'text-success-800',
};

export const ProposalVotingProgressItem: React.FC<IProposalVotingProgressItemProps> = (props) => {
    const {
        name,
        nameDescription,
        description,
        showPercentage,
        showStatus,
        className,
        value,
        thresholdIndicator,
        variant = 'default',
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();

    const isThresholdReached = value >= (thresholdIndicator ?? 100);
    const processedVariant = variant === 'default' ? (isThresholdReached ? 'primary' : 'neutral') : variant;

    const statusIcon = isThresholdReached ? IconType.CHECKMARK : IconType.CLOSE;
    const statusVariant = isThresholdReached ? 'primary' : 'neutral';

    const formattedPercentage = formatterUtils.formatNumber(value / 100, { format: NumberFormat.PERCENTAGE_SHORT });

    return (
        <div className={classNames('flex w-full grow flex-col gap-3', className)}>
            <div className="flex flex-row items-center justify-between">
                <div className={classNames('flex flex-row gap-1 text-base leading-tight font-normal md:text-lg')}>
                    <p className={classNames(variantToNameClassNames[processedVariant])}>
                        {name}
                        {nameDescription && <span className="text-neutral-500">{nameDescription}</span>}
                    </p>
                    {showStatus && isThresholdReached && (
                        <p className="text-primary-400">{copy.proposalVotingProgressItem.reached}</p>
                    )}
                    {showStatus && !isThresholdReached && (
                        <p className="text-neutral-500">{copy.proposalVotingProgressItem.unreached}</p>
                    )}
                </div>
                {showStatus && <AvatarIcon icon={statusIcon} variant={statusVariant} />}
            </div>
            <Progress
                value={value}
                size="md"
                thresholdIndicator={thresholdIndicator}
                variant={processedVariant}
                {...otherProps}
            />
            <div className="flex flex-row justify-between text-sm leading-tight font-normal md:text-base">
                <div className="flex flex-row gap-0.5">
                    <p className="text-neutral-800">{description.value}</p>
                    <p className="text-neutral-500">{description.text}</p>
                </div>
                {showPercentage && <p className="text-neutral-500">{formattedPercentage}</p>}
            </div>
        </div>
    );
};
