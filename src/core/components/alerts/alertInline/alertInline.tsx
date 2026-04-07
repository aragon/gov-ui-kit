import classNames from 'classnames';
import type React from 'react';
import type { HTMLAttributes } from 'react';
import { Icon } from '../../icon';
import { type AlertVariant, alertVariantToIconType } from '../alertUtils';

export interface IAlertInlineProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Alert text content.
     */
    message: string;
    /**
     * Defines the variant of the alert.
     * @default info
     */
    variant?: AlertVariant;
}

const variantToIconClassNames: Record<AlertVariant, string> = {
    critical: 'text-critical-500',
    info: 'text-info-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
};

const variantToTextClassNames: Record<AlertVariant, string> = {
    critical: 'text-critical-800',
    info: 'text-info-800',
    success: 'text-success-800',
    warning: 'text-warning-800',
};

export const AlertInline: React.FC<IAlertInlineProps> = (props) => {
    const { className, message, variant = 'info', ...rest } = props;

    return (
        <div className={classNames('inline-flex items-center gap-x-2 rounded-md', className)} role="alert" {...rest}>
            <Icon
                className={variantToIconClassNames[variant]}
                icon={alertVariantToIconType[variant]}
                responsiveSize={{ md: 'md' }}
                size="sm"
            />
            <p
                className={classNames(
                    'font-normal text-xs leading-tight md:text-base',
                    variantToTextClassNames[variant],
                )}
            >
                {message}
            </p>
        </div>
    );
};
