import { Content, Overlay, Portal, Root, Trigger } from '@radix-ui/react-alert-dialog';
import { FocusScope } from '@radix-ui/react-focus-scope';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { DialogUtils } from '../../dialogUtils';

export type DialogAlertVariant = 'critical' | 'info' | 'success' | 'warning';

export interface IDialogAlertRootProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Additional CSS class names for custom styling of the dialog's content container.
     */
    containerClassName?: string;
    /**
     * Manages the visibility state of the dialog. Should be implemented alongside `onOpenChange` for controlled usage.
     */
    open?: boolean;
    /**
     * Additional CSS class names for custom styling of the overlay behind the dialog.
     */
    overlayClassName?: string;
    /**
     * The visual style variant of the dialog.
     * @default info
     */
    variant?: DialogAlertVariant;
    /**
     * Callback function invoked when the open state of the dialog changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Handler called when focus moves to the trigger after closing the dialog.
     */
    onCloseAutoFocus?: (e: Event) => void;
    /**
     * Handler called when focus moves to the destructive action after opening the dialog.
     */
    onOpenAutoFocus?: (e: Event) => void;
    /**
     * Handler called when the escape key is pressed while the dialog is opened. Closes the dialog by default.
     */
    onEscapeKeyDown?: (e: KeyboardEvent) => void;
    /**
     * Keeps the focus inside the Alert Dialog when set to true.
     * @default true
     */
    useFocusTrap?: boolean;
}

export interface IDialogAlertContext {
    variant: DialogAlertVariant;
}

export const DialogAlertContext = createContext<IDialogAlertContext>({ variant: 'info' });

/**
 * `DialogAlert.Root` component.
 */
export const DialogAlertRoot: React.FC<IDialogAlertRootProps> = (props) => {
    const {
        children,
        containerClassName,
        overlayClassName,
        variant = 'info',
        onCloseAutoFocus,
        onOpenAutoFocus,
        onEscapeKeyDown,
        useFocusTrap = true,
        ...rootProps
    } = props;

    const overlayClassNames = classNames(
        'fixed inset-0 bg-modal-overlay backdrop-blur-md',
        'z-[var(--guk-dialog-alert-overlay-z-index)]',
        overlayClassName,
    );

    const containerClassNames = classNames(
        'fixed inset-x-2 bottom-2 mx-auto max-h-[calc(100vh-80px)] lg:bottom-auto lg:top-[120px] lg:max-h-[calc(100vh-200px)]',
        'flex max-w-[480px] flex-col rounded-xl border border-neutral-100 bg-neutral-0 shadow-neutral-md md:min-w-[480px]',
        'z-[var(--guk-dialog-alert-content-z-index)]',
        containerClassName,
    );

    const contextValue = useMemo(() => ({ variant }), [variant]);

    const handleEscapeKeyDown = (e: KeyboardEvent) => {
        props.onOpenChange?.(false);
        onEscapeKeyDown?.(e);
    };

    return (
        <Root {...rootProps}>
            <Trigger />
            <AnimatePresence>
                {rootProps.open && (
                    <Portal forceMount={true} key="portal">
                        <Overlay className={overlayClassNames} asChild={true}>
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={DialogUtils.overlayAnimationVariants}
                            />
                        </Overlay>
                        <FocusScope trapped={useFocusTrap}>
                            <Content
                                className={containerClassNames}
                                onCloseAutoFocus={onCloseAutoFocus}
                                onEscapeKeyDown={handleEscapeKeyDown}
                                onOpenAutoFocus={onOpenAutoFocus}
                                asChild={true}
                            >
                                <motion.div
                                    variants={DialogUtils.contentAnimationVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="exit"
                                >
                                    <DialogAlertContext.Provider value={contextValue}>
                                        {children}
                                    </DialogAlertContext.Provider>
                                </motion.div>
                            </Content>
                        </FocusScope>
                    </Portal>
                )}
            </AnimatePresence>
        </Root>
    );
};
