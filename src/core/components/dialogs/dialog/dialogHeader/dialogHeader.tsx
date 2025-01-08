import { Close, Description, Title } from '@radix-ui/react-dialog';
import { type ComponentPropsWithoutRef } from 'react';
import { Button } from '../../../button';
import { IconType } from '../../../icon';

export interface IDialogHeaderProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Optional accessible description announced when the dialog is opened
     */
    description?: string;
    /**
     * Indicates whether a back button should be shown
     * @default false
     */
    showBackButton?: boolean;
    /**
     * Accessible title summarizing dialog's content or purpose. Will be announced when
     * dialog is opened.
     */
    title: string;
    /**
     * Callback invoked when the back button is clicked
     */
    onBackClick?: () => void;
    /**
     * Callback invoked when the close button is clicked. Closes the dialog by default
     */
    onCloseClick?: () => void;
}

/**
 * `Dialog.Header` component
 *
 * **NOTE**: This component must be used inside a `<Dialog.Root />` component.
 */
export const DialogHeader: React.FC<IDialogHeaderProps> = (props) => {
    const { description, showBackButton = false, title, onBackClick, onCloseClick, ...otherProps } = props;

    return (
        <div
            className="flex w-full items-start gap-x-3 rounded-t-xl bg-modal-header px-4 pb-2 pt-4 backdrop-blur-md md:gap-x-4 md:px-6 md:pt-6"
            {...otherProps}
        >
            {showBackButton && (
                <Button
                    variant="tertiary"
                    size="sm"
                    iconLeft={IconType.CHEVRON_LEFT}
                    className="shrink-0"
                    onClick={onBackClick}
                />
            )}
            <div className="min-w-0 flex-1 gap-0.5">
                <Title className="flex-1 truncate text-lg leading-tight text-neutral-800">{title}</Title>
                {description && (
                    <Description className="flex-1 text-sm leading-normal text-neutral-500">{description}</Description>
                )}
            </div>
            <Close asChild={true}>
                <Button
                    variant="tertiary"
                    size="sm"
                    iconLeft={IconType.CLOSE}
                    className="shrink-0"
                    onClick={onCloseClick}
                />
            </Close>
        </div>
    );
};
