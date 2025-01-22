import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog';
import { FocusScope } from '@radix-ui/react-focus-scope';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { responsiveUtils } from '../../../../utils';
import { dialogContentAnimationVariants, dialogOverlayAnimationVariants } from '../../dialogUtils';
import { responsiveSizeDialogClassNames, type IDialogRootProps } from './dialogRoot.api';

/**
 * `Dialog.Root` component.
 */
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
        ...rootProps
    } = props;

    const overlayClassNames = classNames(
        'fixed inset-0 bg-modal-overlay backdrop-blur-md',
        'z-[var(--guk-dialog-overlay-z-index)]',
        overlayClassName,
    );

    const sizeClassNames = responsiveUtils.generateClassNames(size, {}, responsiveSizeDialogClassNames);

    const backdrawClassNames = classNames(
        'fixed inset-0 bottom-2 top-12 px-2 md:bottom-6 md:top-60 md:px-6 lg:inset-y-12',
        'flex flex-col justify-end lg:justify-start',
    );

    const modalClassNames = classNames(
        'mx-auto flex max-h-screen w-full flex-col overflow-auto',
        'rounded-xl border border-neutral-100 bg-neutral-0 shadow-neutral-md',
        'z-[var(--guk-dialog-content-z-index)]',
        sizeClassNames,
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
                            <div className={backdrawClassNames}>
                                <Content
                                    className={modalClassNames}
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
                                        {children}
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
