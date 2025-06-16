import * as RadixProgress from '@radix-ui/react-progress';
import classNames from 'classnames';
import type { ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from '../../utils';
import type { IProgressProps, ProgressSize, ProgressVariant } from './progress.api';

const responsiveSizeClassNames: ResponsiveAttributeClassMap<ProgressSize> = {
    sm: {
        default: 'h-1',
        sm: 'sm:h-1',
        md: 'md:h-1',
        lg: 'lg:h-1',
        xl: 'xl:h-1',
        '2xl': '2xl:h-1',
    },
    md: {
        default: 'h-2',
        sm: 'sm:h-2',
        md: 'md:h-2',
        lg: 'lg:h-2',
        xl: 'xl:h-2',
        '2xl': '2xl:h-2',
    },
};

const responsiveIndicatorSizeClassNames: ResponsiveAttributeClassMap<ProgressSize> = {
    sm: {
        default: 'h-3 -top-1',
        sm: 'sm:h-3 sm:-top-1',
        md: 'md:h-3 md:-top-1',
        lg: 'lg:h-3 lg:-top-1',
        xl: 'xl:h-3 xl:-top-1',
        '2xl': '2xl:h-3 2xl:-top-1',
    },
    md: {
        default: 'h-4 -top-1',
        sm: 'sm:h-4 sm:-top-1',
        md: 'md:h-4 md:-top-1',
        lg: 'lg:h-4 lg:-top-1',
        xl: 'xl:h-4 xl:-top-1',
        '2xl': '2xl:h-4 2xl:-top-1',
    },
};

const variantToClassNames: Record<ProgressVariant, string> = {
    primary: 'bg-primary-400',
    neutral: 'bg-neutral-400',
    success: 'bg-success-400',
    critical: 'bg-critical-500',
};

export const Progress: React.FC<IProgressProps> = (props) => {
    const {
        value,
        size = 'md',
        responsiveSize,
        className,
        variant = 'primary',
        thresholdIndicator,
        ...otherProps
    } = props;

    const processedValue = Math.min(Math.max(1, value), 100);
    const processedIndicator = thresholdIndicator != null ? Math.min(Math.max(1, thresholdIndicator), 100) : null;

    const indicatorSizeClassNames = responsiveUtils.generateClassNames(
        size,
        responsiveSize,
        responsiveIndicatorSizeClassNames,
    );

    const sizeClassNames = responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClassNames);

    return (
        <div className="relative w-full">
            <RadixProgress.Root
                value={processedValue}
                className={classNames('overflow-hidden rounded-xl bg-neutral-100', sizeClassNames, className)}
                {...otherProps}
            >
                <RadixProgress.Indicator
                    className={classNames(
                        `h-full transition-[transform] duration-500 ease-in-out`,
                        variantToClassNames[variant],
                    )}
                    style={{ transform: `translateX(-${(100 - processedValue).toString()}%)` }}
                />
            </RadixProgress.Root>
            {processedIndicator != null && (
                <div
                    data-testid="progress-indicator"
                    data-value={processedIndicator}
                    className={classNames(
                        'border-neutral-0 absolute flex self-center border-2',
                        indicatorSizeClassNames,
                    )}
                    style={{ left: `${processedIndicator.toString()}%`, transform: 'translateX(-50%)' }}
                >
                    <div className="h-full w-0.5 rounded-full bg-neutral-400" />
                </div>
            )}
        </div>
    );
};
