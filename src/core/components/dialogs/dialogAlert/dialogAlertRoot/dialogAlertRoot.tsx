import { Content, Overlay, Portal, Root } from '@radix-ui/react-alert-dialog';
import { FocusScope } from '@radix-ui/react-focus-scope';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { dialogContentAnimationVariants, dialogOverlayAnimationVariants } from '../../dialogUtils';
import { DialogAlertContextProvider } from '../dialogAlertContext';
import type { IDialogAlertRootProps } from './dialogAlertRoot.api';
import { DialogAlertRootHiddenElement } from './dialogAlertRootHiddenElement';

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
        hiddenTitle,
        hiddenDescription,
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

    const contextValues = useMemo(() => ({ variant }), [variant]);

    const handleEscapeKeyDown = (e: KeyboardEvent) => {
        props.onOpenChange?.(false);
        onEscapeKeyDown?.(e);
    };

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
                                variants={dialogOverlayAnimationVariants}
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
                                    variants={dialogContentAnimationVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="exit"
                                >
                                    <DialogAlertRootHiddenElement label={hiddenTitle} type="title" />
                                    <DialogAlertRootHiddenElement label={hiddenDescription} type="description" />
                                    <DialogAlertContextProvider value={contextValues}>
                                        {children}
                                    </DialogAlertContextProvider>
                                </motion.div>
                            </Content>
                        </FocusScope>
                    </Portal>
                )}
            </AnimatePresence>
        </Root>
    );
};
