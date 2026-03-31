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
        { 'grid-cols-1 justify-items-center p-6 text-center md:p-12': isStacked }, // Stacked
        { 'gap-4 md:gap-6': isStacked && humanIllustration != null }, // Staked & Human illustration
        { 'grid-cols-[auto_64px] items-center gap-4 p-4': !isStacked }, // Horizontal
        { 'md:grid-cols-[auto_80px] md:px-6 md:py-5': !isStacked }, // Responsive horizontal
        className,
    );

    return (
        <div className={containerClassNames}>
            {humanIllustration &&
                (isStacked ? (
                    <IllustrationHuman className="mb-4 h-auto w-full max-w-[400px] md:mb-6" {...humanIllustration} />
                ) : (
                    <div className="order-last flex aspect-square w-full max-w-20 items-center justify-center justify-self-end overflow-hidden rounded-full bg-neutral-50">
                        <IllustrationHuman className="w-full scale-[1.25]" {...humanIllustration} />
                    </div>
                ))}
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
                className={classNames('flex flex-col', {
                    'w-full items-center': isStacked,
                    'space-y-6': (!!primaryButton || !!secondaryButton) && isStacked,
                    'space-y-3 md:space-y-4': (!!primaryButton || !!secondaryButton) && !isStacked,
                })}
            >
                <div
                    className={classNames({
                        'flex flex-col items-center space-y-1 md:space-y-2': isStacked,
                        'items-start space-y-0.5 md:space-y-1': !isStacked,
                    })}
                >
                    <p
                        className={classNames('font-normal text-neutral-800 leading-tight', {
                            'text-xl md:text-2xl': isStacked,
                            'text-base md:text-lg': !isStacked,
                        })}
                    >
                        {heading}
                    </p>
                    <p
                        className={classNames('font-normal text-neutral-500 leading-tight', {
                            'text-sm md:text-base': isStacked,
                            'text-xs md:text-sm': !isStacked,
                        })}
                    >
                        {description}
                    </p>
                </div>
                <div
                    className={classNames({
                        'flex w-full flex-col items-stretch space-x-0 space-y-3 border-w-full sm:w-fit md:flex-row md:justify-center md:space-x-4 md:space-y-0':
                            isStacked,
                        'flex flex-row flex-wrap gap-3': !isStacked,
                    })}
                >
                    {primaryButton && (
                        <Button
                            {...primaryButton}
                            responsiveSize={isStacked ? { md: 'lg' } : { md: 'md' }}
                            size={isStacked ? 'lg' : 'sm'}
                            variant="primary"
                        >
                            {primaryButton.label}
                        </Button>
                    )}
                    {secondaryButton && (
                        <Button
                            {...secondaryButton}
                            responsiveSize={isStacked ? { md: 'lg' } : { md: 'md' }}
                            size={isStacked ? 'lg' : 'sm'}
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
