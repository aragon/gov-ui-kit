import { Action, Cancel } from '@radix-ui/react-alert-dialog';
import classNames from 'classnames';
import type React from 'react';
import { Button, type IButtonProps } from '../../../button';
import { useDialogAlertContext } from '../dialogAlertContext';

export type IDialogAlertFooterAction = Exclude<IButtonProps, 'children' | 'variant'> & {
    /**
     * Label of the action button.
     */
    label: string;
};

export interface IDialogAlertFooterProps {
    /**
     * Action button of the alert dialog.
     */
    actionButton: IDialogAlertFooterAction;
    /**
     * Secondary button of the alert dialog used for dismissing the dialog or cancelling the action.
     */
    cancelButton: IDialogAlertFooterAction;
}

export const DialogAlertFooter: React.FC<IDialogAlertFooterProps> = (props) => {
    const { actionButton, cancelButton } = props;

    const { variant } = useDialogAlertContext();

    const { label: actionLabel, ...actionButtonProps } = actionButton;
    const { label: cancelLabel, ...cancelButtonProps } = cancelButton;

    const actionVariant = variant === 'info' ? 'secondary' : variant;
    const reverseButtonOrder = variant === 'warning' || variant === 'critical';

    const footerClassNames = classNames(
        'flex gap-3 rounded-b-xl gradient-neutral-50-transparent-to-t px-4 pb-4 pt-3 backdrop-blur-md md:gap-4 md:px-6 md:pb-6',
        { 'flex-col md:flex-row': !reverseButtonOrder },
        { 'justify-end flex-col-reverse md:flex-row-reverse': reverseButtonOrder },
    );

    return (
        <div className={footerClassNames}>
            <Action asChild={true}>
                <Button size="md" {...actionButtonProps} variant={actionVariant}>
                    {actionLabel}
                </Button>
            </Action>
            <Cancel asChild={true}>
                <Button size="md" {...cancelButtonProps} variant="tertiary">
                    {cancelLabel}
                </Button>
            </Cancel>
        </div>
    );
};
