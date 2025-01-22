import { Content, Overlay, Portal, Root, Trigger } from '@radix-ui/react-alert-dialog';
import { FocusScope } from '@radix-ui/react-focus-scope';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { responsiveUtils } from '../../../../utils';
import { responsiveSizeDialogClassNames } from '../../dialog/dialogRoot/dialogRoot.api';
import { dialogContentAnimationVariants, dialogOverlayAnimationVariants } from '../../dialogUtils';
import { type IDialogAlertRootProps, DialogAlertContext } from './dialogAlertRoot.api';

/**
 * `DialogAlert.Root` component.
 */
export const DialogAlertRoot: React.FC<IDialogAlertRootProps> = (props) => {
    const {
        children,
        containerClassName,
        overlayClassName,
        variant = 'info',
        size = 'md',
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

    const sizeClassNames = responsiveUtils.generateClassNames(size, {}, responsiveSizeDialogClassNames);

    // The backdraw is a flex container that fills the screen while aligning
    // and constraining the dialog vertically based on the viewport size.
    const backdrawClassNames = classNames(
        'fixed inset-0 bottom-2 top-12 px-2 md:bottom-6 md:top-60 md:px-6 lg:inset-y-12',
        'flex flex-col justify-end lg:justify-start',
    );

    const modalClassNames = classNames(
        'mx-auto flex max-h-screen w-full flex-col overflow-auto',
        'rounded-xl border border-neutral-100 bg-neutral-0 shadow-neutral-md',
        'z-[var(--guk-dialog-alert-content-z-index)]',
        sizeClassNames,
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
                                variants={dialogOverlayAnimationVariants}
                            />
                        </Overlay>
                        <FocusScope trapped={useFocusTrap}>
                            <div className={backdrawClassNames}>
                                <Content
                                    className={modalClassNames}
                                    onCloseAutoFocus={onCloseAutoFocus}
                                    onEscapeKeyDown={handleEscapeKeyDown}
                                    onOpenAutoFocus={onOpenAutoFocus}
                                    asChild={true}
                                >
                                    <motion.div
                                        variants={dialogContentAnimationVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="exit"
                                    >
                                        <DialogAlertContext.Provider value={contextValue}>
                                            {children}
                                        </DialogAlertContext.Provider>
                                    </motion.div>
                                </Content>
                            </div>
                        </FocusScope>
                    </Portal>
                )}
            </AnimatePresence>
        </Root>
    );
};
