import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog';
import { FocusScope } from '@radix-ui/react-focus-scope';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { DialogUtils } from '../../dialogUtils';

export interface IDialogRootProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Additional CSS class names for custom styling of the dialog's content container.
     */
    containerClassName?: string;
    /**
     * Determines whether interactions with elements outside of the dialog will be disabled.
     * @default true
     */
    modal?: boolean;
    /**
     * Manages the visibility state of the dialog.
     */
    open?: boolean;
    /**
     * Additional CSS class names for custom styling of the overlay behind the dialog.
     */
    overlayClassName?: string;
    /**
     * Handler called when focus moves to the trigger after closing
     */
    onCloseAutoFocus?: (e: Event) => void;
    /**
     * Handler called when the escape key is pressed while the dialog is opened. Closes the dialog by default.
     */
    onEscapeKeyDown?: (e: KeyboardEvent) => void;
    /**
     * Handler called when an interaction (pointer or focus event) happens outside the bounds of the component
     */
    onInteractOutside?: (e: Event) => void;
    /**
     * Handler called when focus moves into the component after opening
     */
    onOpenAutoFocus?: (e: Event) => void;
    /**
     * Callback function invoked when the open state of the dialog changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Handler called when a pointer event occurs outside the bounds of the component
     */
    onPointerDownOutside?: (e: Event) => void;
    /**
     * Keeps the focus inside the Dialog when set to true.
     * @default true
     */
    useFocusTrap?: boolean;
}

/**
 * `Dialog.Root` component.
 */
export const DialogRoot: React.FC<IDialogRootProps> = (props) => {
    const {
        children,
        containerClassName,
        overlayClassName,
        onCloseAutoFocus,
        onEscapeKeyDown,
        onInteractOutside,
        onOpenAutoFocus,
        onPointerDownOutside,
        useFocusTrap = true,
        ...rootProps
    } = props;

    const overlayClassNames = classNames(
        'fixed inset-0 bg-modal-overlay backdrop-blur-md',
        'z-[var(--guk-dialog-overlay-z-index)]',
        overlayClassName,
    );

    const containerClassNames = classNames(
        'fixed inset-x-2 bottom-2 mx-auto max-h-[calc(100vh-80px)] lg:bottom-auto lg:top-[120px] lg:max-h-[calc(100vh-200px)]',
        'flex max-w-[480px] flex-col rounded-xl border border-neutral-100 bg-neutral-0 shadow-neutral-md md:min-w-[480px]',
        'z-[var(--guk-dialog-content-z-index)]',
        containerClassName,
    );

    return (
        <Root {...rootProps}>
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
                                onEscapeKeyDown={onEscapeKeyDown}
                                onInteractOutside={onInteractOutside}
                                onOpenAutoFocus={onOpenAutoFocus}
                                onPointerDownOutside={onPointerDownOutside}
                                asChild={true}
                            >
                                <motion.div
                                    variants={DialogUtils.contentAnimationVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="exit"
                                >
                                    {children}
                                </motion.div>
                            </Content>
                        </FocusScope>
                    </Portal>
                )}
            </AnimatePresence>
        </Root>
    );
};
