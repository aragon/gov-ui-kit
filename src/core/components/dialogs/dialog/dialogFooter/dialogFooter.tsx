import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ComponentPropsWithoutRef } from 'react';
import { AlertInline, type IAlertInlineProps } from '../../../alerts';
import { Button, type IButtonBaseProps } from '../../../button';

export type IDialogFooterAction = (
    | Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
    | Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'>
) &
    Pick<IButtonBaseProps, 'iconRight' | 'iconLeft' | 'disabled' | 'isLoading'> & {
        /**
         * Button label
         */
        label: string;
    };

export interface IDialogFooterProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Optional AlertInline
     */
    alert?: IAlertInlineProps;
    /**
     * Dialog primary action button
     */
    primaryAction?: IDialogFooterAction;
    /**
     * Dialog secondary action button
     */
    secondaryAction?: IDialogFooterAction;
}

/**
 * `Dialog.Footer` component
 */
export const DialogFooter: React.FC<IDialogFooterProps> = (props) => {
    const { alert, primaryAction, secondaryAction, ...otherProps } = props;
    const { label: primaryLabel, ...primaryBtnProps } = primaryAction ?? { label: '' };
    const { label: secondaryLabel, ...secondaryButtonProps } = secondaryAction ?? { label: '' };

    const renderButtonGroup = !!primaryAction || !!secondaryAction;

    return (
        <div
            className="flex flex-col gap-4 rounded-b-xl bg-modal-footer px-4 pb-4 pt-2 backdrop-blur-md md:px-6 md:pb-6"
            {...otherProps}
        >
            {renderButtonGroup && (
                <div className="flex flex-col gap-3 md:flex-row">
                    {primaryAction && (
                        <Button className="w-full md:w-auto" {...primaryBtnProps} size="lg" variant="primary">
                            {primaryLabel}
                        </Button>
                    )}
                    {secondaryAction && (
                        <Button className="w-full md:w-auto" {...secondaryButtonProps} variant="tertiary" size="lg">
                            {secondaryLabel}
                        </Button>
                    )}
                </div>
            )}
            {alert && (
                <div className="flex w-full justify-center md:justify-start">
                    <AlertInline variant="info" {...alert} />
                </div>
            )}
        </div>
    );
};
