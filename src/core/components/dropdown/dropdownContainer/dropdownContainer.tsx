import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import { Button, type IButtonProps } from '../../button';
import { IconType } from '../../icon';

export interface IDropdownContainerProps extends Omit<ComponentProps<'div'>, 'dir'> {
    /**
     * Size of the dropdown trigger.
     * @default lg
     */
    size?: IButtonProps['size'];
    /**
     * Custom dropdown trigger displayed instead of the default button.
     */
    customTrigger?: ReactNode;
    /**
     * Size of the dropdown trigger depending on the current breakpoint.
     */
    responsiveSize?: IButtonProps['responsiveSize'];
    /**
     * Label of the dropdown trigger.
     */
    label?: string;
    /**
     * Alignment of the dropdown content.
     * @default start
     */
    align?: RadixDropdown.DropdownMenuContentProps['align'];
    /**
     * Hides the dropdown trigger icon when set to true. This property has no effect when the label property
     * is not set or is empty.
     */
    hideIcon?: boolean;
    /**
     * Disables the dropdown when set to true.
     */
    disabled?: boolean;
    /**
     * Whether the dropdown is open by default.
     */
    defaultOpen?: boolean;
    /**
     * Whether the dropdown is open.
     */
    open?: boolean;
    /**
     * Callback when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Sets a max width to the dropdown content as the remaining width between the trigger and the boundary edge.
     * @default true
     */
    constrainContentWidth?: boolean;
    /**
     * Sets a max height to the dropdown content as the remaining height between the trigger and the boundary edge.
     * @default true
     */
    constrainContentHeight?: boolean;
    /**
     * Additional classnames for the dropdown container (e.g. for setting a max width for the dropdown items).
     */
    contentClassNames?: string;
}

export const DropdownContainer: React.FC<IDropdownContainerProps> = (props) => {
    const {
        children,
        size = 'lg',
        responsiveSize,
        label,
        defaultOpen,
        hideIcon,
        open,
        onOpenChange,
        disabled,
        align = 'start',
        customTrigger,
        constrainContentWidth = true,
        constrainContentHeight = true,
        contentClassNames,
        ...otherProps
    } = props;

    const [isOpen, setIsOpen] = useState(open ?? defaultOpen);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
    };

    const triggerIcon = isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN;
    const hasLabel = label != null && label.length > 0;

    // Update internal isOpen state on open property change
    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <RadixDropdown.Root open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange} {...otherProps}>
            <RadixDropdown.Trigger className="group" asChild={true} disabled={disabled}>
                {customTrigger ?? (
                    <Button
                        variant="tertiary"
                        size={size}
                        responsiveSize={responsiveSize}
                        iconLeft={!hasLabel ? triggerIcon : undefined}
                        iconRight={hideIcon ? undefined : triggerIcon}
                        disabled={disabled}
                        className={isOpen ? 'border-neutral-300' : undefined}
                    >
                        {label}
                    </Button>
                )}
            </RadixDropdown.Trigger>
            <RadixDropdown.Portal>
                <RadixDropdown.Content
                    className={classNames(
                        'flex min-w-48 flex-col gap-1.5 overflow-auto rounded-xl border border-neutral-100 bg-neutral-0 p-2 shadow-neutral-sm',
                        'z-[var(--guk-dropdown-container-content-z-index)]',
                        { 'max-h-[var(--radix-dropdown-menu-content-available-height)]': constrainContentHeight },
                        { 'max-w-[var(--radix-dropdown-menu-content-available-width)]': constrainContentWidth },
                        contentClassNames,
                    )}
                    onCloseAutoFocus={(event) => event.preventDefault()}
                    align={align}
                    sideOffset={4}
                >
                    {children}
                </RadixDropdown.Content>
            </RadixDropdown.Portal>
        </RadixDropdown.Root>
    );
};
