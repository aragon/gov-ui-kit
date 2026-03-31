import { Close, Description, Title } from '@radix-ui/react-dialog';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import { AvatarIcon } from '../../../avatars';
import { IconType } from '../../../icon';

export interface IDialogHeaderProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Title of the dialog displayed on the header and used as the dialog's accessible name.
     */
    title: string;
    /**
     * Optional description of the dialog. When set here, the description stays sticky with the header
     * and remains visible while scrolling through long content.
     */
    description?: string;
    /**
     * Callback triggered on close button click. The close button is not displayed when the property is not set.
     */
    onClose?: () => void;
}

export const DialogHeader: React.FC<IDialogHeaderProps> = (props) => {
    const { title, onClose, className, description, ...otherProps } = props;

    const headerClassNames = classNames(
        'gradient-neutral-50-transparent-to-b relative flex w-full items-start rounded-t-xl backdrop-blur-md', // Layout
        'pt-4 pr-14 pb-1.5 pl-4 md:pt-6 md:pr-16 md:pb-2 md:pl-6', // Spacings
        className,
    );

    const closeButtonClassNames = classNames(
        'group cursor-pointer rounded-full border border-neutral-100 bg-neutral-0 p-1 outline-hidden', // Default
        'absolute top-3 right-3 md:top-4 md:right-4', // Positioning
        'focus-ring-primary hover:border-neutral-200 active:border-neutral-200 active:bg-neutral-50', // Hover/Active/Focus states
    );

    return (
        <div className="flex flex-col items-start gap-y-2">
            <div className={headerClassNames} {...otherProps}>
                <Title className="flex-1 truncate font-normal text-lg text-neutral-800 leading-tight md:text-xl">
                    {title}
                </Title>
                <Close asChild={true}>
                    {onClose != null && (
                        <button className={closeButtonClassNames} onClick={onClose} type="button">
                            <AvatarIcon
                                backgroundWhite={true}
                                className="group-hover:bg-neutral-50"
                                icon={IconType.CLOSE}
                                size="sm"
                            />
                        </button>
                    )}
                </Close>
            </div>
            {description && (
                <Description className="px-4 pb-3 text-neutral-500 text-sm leading-normal md:px-6 md:pb-4">
                    {description}
                </Description>
            )}
        </div>
    );
};
