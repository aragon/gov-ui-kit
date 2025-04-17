import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog';
import { FocusScope } from '@radix-ui/react-focus-scope';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { dialogContentAnimationVariants, dialogOverlayAnimationVariants } from '../../dialogUtils';
import type { DialogSize, IDialogRootProps } from './dialogRoot.api';
import { DialogRootHiddenElement } from './dialogRootHiddenElement';

const sizeToClassNames: Record<DialogSize, string> = {
    sm: 'max-w-[320px]',
    md: 'max-w-[480px]',
    lg: 'max-w-[640px]',
    xl: 'max-w-[880px]',
};

export const DialogRoot: React.FC<IDialogRootProps> = (props) => {
    const {
        children,
        size = 'md',
        containerClassName,
        overlayClassName,
        onCloseAutoFocus,
        onEscapeKeyDown,
        onInteractOutside,
        onOpenAutoFocus,
        onPointerDownOutside,
        useFocusTrap = true,
        hiddenTitle,
        hiddenDescription,
        ...rootProps
    } = props;

    const overlayClassNames = classNames(
        'fixed inset-0 bg-modal-overlay backdrop-blur-md',
        'z-[var(--guk-dialog-overlay-z-index)]',
        overlayClassName,
    );

    const containerClassNames = classNames(
        'fixed inset-x-2 bottom-2 mx-auto max-h-[calc(100vh-80px)] focus:outline-hidden md:inset-x-6 md:bottom-6 lg:bottom-auto lg:top-12 lg:max-h-[calc(100vh-200px)]',
        'flex flex-col rounded-xl border border-neutral-100 bg-neutral-0 shadow-neutral-md',
        'z-[var(--guk-dialog-content-z-index)]',
        sizeToClassNames[size],
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
                                variants={dialogOverlayAnimationVariants}
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
                                    variants={dialogContentAnimationVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="exit"
                                >
                                    <DialogRootHiddenElement label={hiddenTitle} type="title" />
                                    <DialogRootHiddenElement label={hiddenDescription} type="description" />
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
