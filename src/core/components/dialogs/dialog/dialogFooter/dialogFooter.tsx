import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import { Button, type IButtonProps } from '../../../button';

export type IDialogFooterAction = Exclude<IButtonProps, 'children' | 'variant'> & {
    /**
     * Label of the action button.
     */
    label: string;
};

export interface IDialogFooterProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Primary action of the dialog.
     */
    primaryAction?: IDialogFooterAction;
    /**
     * Secondary action of the dialog.
     */
    secondaryAction?: IDialogFooterAction;
    /**
     * Variant of the dialog footer.
     * @default default
     */
    variant?: 'default' | 'wizard';
    /**
     * Displays the primary actions with error variant when set to true.
     */
    hasError?: boolean;
}

export const DialogFooter: React.FC<IDialogFooterProps> = (props) => {
    const { primaryAction, secondaryAction, variant = 'default', hasError, className, children, ...otherProps } = props;

    const { label: primaryLabel, ...primaryButtonProps } = primaryAction ?? {};

    const { label: secondaryLabel, ...secondaryButtonProps } = secondaryAction ?? {};

    const footerClassNames = classNames(
        'gradient-neutral-50-transparent-to-t flex flex-col rounded-b-xl px-4 pt-3 pb-4 backdrop-blur-md md:px-6 md:pb-6',
    );

    const actionsClassNames = classNames(
        'flex gap-3 pt-6 md:gap-4 ',
        { 'flex-col md:flex-row': variant === 'default' },
        { 'flex-row-reverse justify-between': variant === 'wizard' },
        className,
    );

    return (
        <div className={footerClassNames} {...otherProps}>
            {children}
            <div className={actionsClassNames}>
                {primaryAction && (
                    <Button size="md" {...primaryButtonProps} variant={hasError ? 'critical' : 'primary'}>
                        {primaryLabel}
                    </Button>
                )}
                {secondaryAction && (
                    <Button size="md" {...secondaryButtonProps} variant="tertiary">
                        {secondaryLabel}
                    </Button>
                )}
            </div>
        </div>
    );
};
