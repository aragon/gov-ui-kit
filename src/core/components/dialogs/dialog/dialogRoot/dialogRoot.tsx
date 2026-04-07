import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog';
import { FocusScope } from '@radix-ui/react-focus-scope';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { dialogContentAnimationVariants, dialogOverlayAnimationVariants } from '../../dialogUtils';
import type { DialogSize, IDialogRootProps } from './dialogRoot.api';
import { DialogRootHiddenElement } from './dialogRootHiddenElement';

const sizeToClassNames: Record<DialogSize, string> = {
    sm: 'max-w-80',
    md: 'max-w-120',
    lg: 'max-w-160',
    xl: 'max-w-220',
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
        'gradient-neutral-50-transparent-to-t fixed inset-0 backdrop-blur-md',
        'z-[var(--guk-dialog-overlay-z-index)]',
        overlayClassName,
    );

    const containerClassNames = classNames(
        'fixed inset-x-2 bottom-2 mx-auto max-h-[calc(100vh-80px)] focus:outline-hidden md:inset-x-6 md:bottom-6 lg:top-12 lg:bottom-auto lg:max-h-[calc(100vh-200px)]',
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
                        <Overlay asChild={true} className={overlayClassNames}>
                            <motion.div
                                animate="open"
                                exit="closed"
                                initial="closed"
                                variants={dialogOverlayAnimationVariants}
                            />
                        </Overlay>
                        <FocusScope trapped={useFocusTrap}>
                            <Content
                                asChild={true}
                                className={containerClassNames}
                                onCloseAutoFocus={onCloseAutoFocus}
                                onEscapeKeyDown={onEscapeKeyDown}
                                onInteractOutside={onInteractOutside}
                                onOpenAutoFocus={onOpenAutoFocus}
                                onPointerDownOutside={onPointerDownOutside}
                            >
                                <motion.div
                                    animate="open"
                                    exit="exit"
                                    initial="closed"
                                    variants={dialogContentAnimationVariants}
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
