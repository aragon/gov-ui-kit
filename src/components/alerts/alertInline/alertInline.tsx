import classNames from 'classnames';
import type React from 'react';
import { type HTMLAttributes } from 'react';

import { Icon } from '../../icon';
import { alertVariantToIconType, type AlertVariant } from '../utils';

export interface IAlertInlineProps extends HTMLAttributes<HTMLDivElement> {
    /** Alert text content. */
    message: string;
    /** Defines the variant of the alert. */
    variant: AlertVariant;
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

/** AlertInline UI Component */
export const AlertInline: React.FC<IAlertInlineProps> = (props) => {
    const { className, message, variant, ...rest } = props;
    return (
        <div role="alert" className={classNames('inline-flex items-center gap-x-2 rounded', className)} {...rest}>
            <Icon
                icon={alertVariantToIconType[variant]}
                responsiveSize={{ sm: 'sm' }}
                className={variantToIconClassNames[variant]}
            />
            <p
                className={classNames(
                    'text-xs font-semibold leading-tight md:text-base',
                    variantToTextClassNames[variant],
                )}
            >
                {message}
            </p>
        </div>
    );
};
