import classNames from 'classnames';
import { AvatarIcon, IconType, Progress, type IProgressProps } from '../../../../../core';

// TODO: to be removed when implemented in progress component
export type ProgressVariant = 'primary' | 'success' | 'critical' | 'neutral';

export interface IProposalVotingProgressDescription {
    /**
     * Value of the description highlighted.
     */
    value: string;
    /**
     * Text of the description.
     */
    text: string;
}

export interface IProposalVotingProgressProps extends IProgressProps {
    /**
     * Name of the voting progress.
     */
    name: string;
    /**
     * Description of the voting progress displayed below the progress bar.
     */
    description: IProposalVotingProgressDescription;
    /**
     * Displays the progress bar value as percentage when set to true.
     */
    showPercentage?: boolean;
    /**
     * Displays a status icon based on the progress bar and indicator values when set to true. The component renders a
     * "success" status icon when value is equal or greater than indicator, and a "failed" status icon otherwise.
     */
    showStatusIcon?: boolean;
    /**
     * TODO: to be removed when included in progress component
     */
    variant?: ProgressVariant;
    indicator?: number;
}

const variantToNameClassNames: Record<ProgressVariant, string> = {
    critical: 'text-critical-800',
    primary: 'text-primary-400',
    neutral: 'text-neutral-800',
    success: 'text-success-800',
};

export const ProposalVotingProgress: React.FC<IProposalVotingProgressProps> = (props) => {
    const {
        name,
        description,
        showPercentage,
        showStatusIcon,
        className,
        value,
        indicator,
        variant = 'neutral',
        ...otherProps
    } = props;

    const statusIcon = value >= (indicator ?? 100) ? IconType.CHECKMARK : IconType.CLOSE;

    return (
        <div className={classNames('flex grow flex-col gap-3', className)}>
            <div className="flex flex-row items-center justify-between">
                <p
                    className={classNames(
                        'text-base font-normal leading-tight md:text-lg',
                        variantToNameClassNames[variant],
                    )}
                >
                    {name}
                </p>
                {(showPercentage != null || showStatusIcon != null) && (
                    <div className="flex flex-row gap-2">
                        {showPercentage && <p className="text-base font-normal leading-tight md:text-lg">{value}%</p>}
                        {showStatusIcon && <AvatarIcon icon={statusIcon} />}
                    </div>
                )}
            </div>
            <Progress value={value} size="md" {...otherProps} />
            <div className="flex flex-row gap-0.5 text-base font-normal leading-tight md:text-lg">
                <p className="text-neutral-800">{description.value}</p>
                <p className="text-neutral-500">{description.text}</p>
            </div>
        </div>
    );
};
