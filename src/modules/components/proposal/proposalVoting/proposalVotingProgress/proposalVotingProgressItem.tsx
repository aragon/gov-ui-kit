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

export interface IProposalVotingProgressItemProps extends IProgressProps {
    /**
     * Name of the voting progress.
     */
    name: string;
    /**
     * Description of the voting progress displayed below the progress bar.
     */
    description: IProposalVotingProgressItemDescription;
    /**
     * Displays the progress bar value as percentage when set to true.
     */
    showPercentage?: boolean;
    /**
     * Displays a status icon based on the progress bar and indicator values when set to true. The component renders a
     * "success" status icon when value is equal or greater than indicator, and a "failed" status icon otherwise.
     */
    showStatusIcon?: boolean;
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
        description,
        showPercentage,
        showStatusIcon,
        className,
        value,
        thresholdIndicator,
        variant = 'neutral',
        ...otherProps
    } = props;

    const isThresholdReached = value >= (thresholdIndicator ?? 100);
    const statusIcon = isThresholdReached ? IconType.CHECKMARK : IconType.CLOSE;
    const statusVariant = isThresholdReached ? 'primary' : 'neutral';

    const formattedPercentage = formatterUtils.formatNumber(value / 100, { format: NumberFormat.PERCENTAGE_SHORT });

    return (
        <div className={classNames('flex w-full grow flex-col gap-3', className)}>
            <div className="flex flex-row items-center justify-between">
                <p
                    className={classNames(
                        'text-base leading-tight font-normal md:text-lg',
                        variantToNameClassNames[variant],
                    )}
                >
                    {name}
                </p>
                {(showPercentage != null || showStatusIcon != null) && (
                    <div className="flex flex-row gap-2">
                        {showPercentage && (
                            <p
                                className={classNames(
                                    'text-base leading-tight font-normal text-neutral-500 md:text-lg',
                                    { 'text-neutral-500': variant !== 'primary' },
                                    { 'text-primary-400': variant === 'primary' },
                                )}
                            >
                                {formattedPercentage}
                            </p>
                        )}
                        {showStatusIcon && <AvatarIcon icon={statusIcon} variant={statusVariant} />}
                    </div>
                )}
            </div>
            <Progress
                value={value}
                size="md"
                thresholdIndicator={thresholdIndicator}
                variant={variant}
                {...otherProps}
            />
            <div className="flex flex-row gap-0.5 text-base leading-tight font-normal md:text-lg">
                <p className="text-neutral-800">{description.value}</p>
                <p className="text-neutral-500">{description.text}</p>
            </div>
        </div>
    );
};
