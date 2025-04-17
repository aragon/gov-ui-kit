import classNames from 'classnames';
import { Button } from '../../button';
import { IllustrationHuman, IllustrationObject } from '../../illustrations';
import type { IEmptyStateProps } from './emptyState.api';

export const EmptyState: React.FC<IEmptyStateProps> = ({
    heading,
    description,
    primaryButton,
    secondaryButton,
    className,
    isStacked = true,
    objectIllustration,
    humanIllustration,
}) => {
    const containerClassNames = classNames(
        'grid w-full', // Defaults
        { 'grid-cols-1 justify-items-center text-center p-6 md:p-12': isStacked }, // Stacked
        { 'gap-4 md:gap-6': isStacked && humanIllustration != null }, // Staked & Human illustration
        { 'grid-cols-[auto_64px] gap-4 p-4 items-center': !isStacked }, // Horizontal
        { 'md:grid-cols-[auto_80px] md:px-6 md:py-5': !isStacked }, // Responsive horizontal
        className,
    );

    return (
        <div className={containerClassNames}>
            {humanIllustration && (
                <IllustrationHuman
                    className={classNames({
                        'mb-4 h-auto w-full max-w-[400px] md:mb-6': isStacked,
                        'order-last h-auto w-full max-w-20 justify-self-end': !isStacked,
                    })}
                    {...humanIllustration}
                />
            )}
            {objectIllustration && (
                <IllustrationObject
                    className={classNames({
                        'h-auto w-full max-w-40': isStacked,
                        'order-last h-auto w-full max-w-20 justify-self-end rounded-full bg-neutral-50': !isStacked,
                    })}
                    {...objectIllustration}
                />
            )}

            <div
                className={classNames('flex h-full items-center', {
                    'w-full flex-col': isStacked,
                    'space-y-6': (isStacked && !!primaryButton) || !!secondaryButton,
                    'space-y-4': (!isStacked && !!primaryButton) || !!secondaryButton,
                })}
            >
                <div
                    className={classNames({
                        'flex flex-col items-center space-y-1 md:space-y-2': isStacked,
                        'items-start space-y-0.5 md:space-y-1': !isStacked,
                    })}
                >
                    <p
                        className={classNames('leading-tight font-normal text-neutral-800', {
                            'text-xl md:text-2xl': isStacked,
                            'text-base md:text-lg': !isStacked,
                        })}
                    >
                        {heading}
                    </p>
                    <p
                        className={classNames('leading-tight font-normal text-neutral-500', {
                            'text-sm md:text-base': isStacked,
                            'text-xs md:text-sm': !isStacked,
                        })}
                    >
                        {description}
                    </p>
                </div>
                <div
                    className={classNames({
                        'border-w-full flex flex-col items-stretch space-y-3 space-x-0 md:flex-row md:justify-center md:space-y-0 md:space-x-4':
                            isStacked,
                        'flex flex-row flex-wrap gap-3': !isStacked,
                    })}
                >
                    {primaryButton && (
                        <Button
                            {...primaryButton}
                            size={isStacked ? 'lg' : 'sm'}
                            responsiveSize={isStacked ? { md: 'lg' } : { md: 'md' }}
                            variant="primary"
                        >
                            {primaryButton.label}
                        </Button>
                    )}
                    {secondaryButton && (
                        <Button
                            {...secondaryButton}
                            size={isStacked ? 'lg' : 'sm'}
                            responsiveSize={isStacked ? { md: 'lg' } : { md: 'md' }}
                            variant="secondary"
                        >
                            {secondaryButton.label}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
