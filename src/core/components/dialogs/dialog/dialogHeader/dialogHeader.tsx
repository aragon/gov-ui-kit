import { Close, Title } from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import { AvatarIcon } from '../../../avatars';
import { IconType } from '../../../icon';

export interface IDialogHeaderProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Title of the dialog displayed on the header and used as the dialog's accessible name.
     */
    title: string;
    /**
     * Callback triggered on close button click. The close button is not displayed when the property is not set.
     */
    onClose?: () => void;
}

export const DialogHeader: React.FC<IDialogHeaderProps> = (props) => {
    const { title, onClose, className, ...otherProps } = props;

    const headerClassNames = classNames(
        'relative flex w-full items-start rounded-t-xl bg-modal-header backdrop-blur-md', // Layout
        'pb-1.5 pl-4 pr-14 pt-4 md:pb-2 md:pl-6 md:pr-16 md:pt-6', // Spacings
        className,
    );

    const closeButtonClassNames = classNames(
        'group rounded-full border border-neutral-100 bg-neutral-0 p-1 outline-none', // Default
        'absolute right-3 top-3 md:right-4 md:top-4', // Positioning
        'hover:border-neutral-200 active:border-neutral-200 active:bg-neutral-50', // Hover/Active states
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state,
    );

    return (
        <div className={headerClassNames} {...otherProps}>
            <Title className="flex-1 truncate text-lg font-normal leading-tight text-neutral-800 md:text-xl">
                {title}
            </Title>
            <Close asChild={true}>
                {onClose != null && (
                    <button onClick={onClose} className={closeButtonClassNames} type="button">
                        <AvatarIcon
                            icon={IconType.CLOSE}
                            size="sm"
                            backgroundWhite={true}
                            className="group-hover:bg-neutral-50"
                        />
                    </button>
                )}
            </Close>
        </div>
    );
};
