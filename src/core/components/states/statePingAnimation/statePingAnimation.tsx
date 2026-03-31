import classNames from 'classnames';
import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export type StatePingAnimationVariant = 'primary' | 'info' | 'success' | 'warning' | 'critical';

export interface IStatePingAnimationProps extends ComponentPropsWithoutRef<'span'> {
    /**
     * Variant of the ping animation
     * @default primary
     */
    variant?: StatePingAnimationVariant;
}

const variantToBgClassName: Record<StatePingAnimationVariant, string> = {
    info: 'bg-info-500',
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    critical: 'bg-critical-500',
};

export const StatePingAnimation: React.FC<IStatePingAnimationProps> = (props) => {
    const { className, variant = 'primary', ...otherProps } = props;

    return (
        <span
            className={classNames('relative flex size-3', className)}
            data-testid="statePingAnimation"
            {...otherProps}
        >
            <span
                className={classNames(
                    'absolute inline-flex size-full animate-ping rounded-full opacity-75',
                    variantToBgClassName[variant],
                )}
            />
            <span className={classNames('relative inline-flex size-3 rounded-full', variantToBgClassName[variant])} />
        </span>
    );
};
