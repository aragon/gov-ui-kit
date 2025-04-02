import classNames from 'classnames';
import type React from 'react';
import { type HTMLAttributes } from 'react';
import { Icon } from '../../icon';
import { alertVariantToIconType, type AlertVariant } from '../alertUtils';

export interface IAlertCardProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The alert message.
     */
    message: string;
    /**
     * Variant of the alert.
     * @default info
     */
    variant?: AlertVariant;
}

// Maps alert variants to container class names.
const alertVariantToContainerClassNames: Record<AlertVariant, string> = {
    critical: 'border-critical-400 shadow-critical',
    info: 'border-info-400 shadow-info',
    success: 'border-success-400 shadow-success',
    warning: 'border-warning-400 shadow-warning',
};

// Maps alert variants to icon class names.
const alertVariantToIconClassNames: Record<AlertVariant, string> = {
    critical: 'text-critical-500',
    info: 'text-info-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
};

// Maps alert variants to message class names.
const alertVariantToMessageClassNames: Record<AlertVariant, string> = {
    critical: 'text-critical-800',
    info: 'text-info-800',
    success: 'text-success-800',
    warning: 'text-warning-800',
};

export const AlertCard: React.FC<IAlertCardProps> = (props) => {
    const { className, children, message, variant = 'info', ...otherProps } = props;

    return (
        <div
            role="alert"
            className={classNames(
                'w-full rounded-xl border bg-neutral-0 px-4 py-3 md:px-6 md:py-5',
                alertVariantToContainerClassNames[variant],
                className,
            )}
            {...otherProps}
        >
            <div className="flex items-center gap-x-2 md:gap-x-3">
                <Icon icon={alertVariantToIconType[variant]} className={alertVariantToIconClassNames[variant]} />
                <p
                    className={classNames(
                        'flex-1 text-sm font-semibold leading-tight md:text-base md:leading-normal',
                        alertVariantToMessageClassNames[variant],
                    )}
                >
                    {message}
                </p>
            </div>
            <div className="ml-6 text-sm font-normal leading-normal text-neutral-500 md:ml-7 md:text-base">
                {children}
            </div>
        </div>
    );
};
