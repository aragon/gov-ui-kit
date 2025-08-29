import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React, { type ComponentProps } from 'react';
import { Icon, IconType } from '../../icon';

export interface IDropdownItemProps extends Omit<ComponentProps<'div'>, 'onSelect'> {
    /**
     * Renders the dropdown item as selected when set to true.
     */
    selected?: boolean;
    /**
     * Icon displayed beside the item label. Defaults to LinkExternal when the item is a link or to Checkmark when the
     * selected property is set to true.
     */
    icon?: IconType;
    /**
     * Position of the icon.
     * @default right
     */
    iconPosition?: 'right' | 'left';
    /**
     * Link of the dropdown item.
     */
    href?: string;
    /**
     * Target of the dropdown link.
     */
    target?: string;
    /**
     * Rel attribute of the dropdown link.
     */
    rel?: string;
    /**
     * Form id to associate the dropdown item with a form. In this case, the dropdown item will behave as a submit button.
     */
    formId?: string;
    /**
     * Disables the dropdown item when set to true.
     */
    disabled?: boolean;
    /**
     * Callback when the dropdown item is selected.
     */
    onSelect?: (event: Event) => void;
}

export const DropdownItem: React.FC<IDropdownItemProps> = (props) => {
    const {
        className,
        icon,
        selected,
        iconPosition = 'right',
        children,
        disabled,
        href,
        target,
        rel,
        formId,
        ...otherProps
    } = props;

    const renderSubmitButton = formId != null;
    const renderLink = href != null && href.length > 0;

    let ItemWrapper: React.ElementType = React.Fragment;
    let itemWrapperProps:
        | React.AnchorHTMLAttributes<HTMLAnchorElement>
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | object = {};

    if (renderLink) {
        ItemWrapper = 'a';
        itemWrapperProps = {
            href,
            target,
            rel: target === '_blank' ? `noopener noreferrer ${rel ?? ''}` : rel,
        };
    } else if (renderSubmitButton) {
        ItemWrapper = 'button';
        itemWrapperProps = {
            type: 'submit' as const,
            form: formId,
        };
    }

    const handleSelect = (event: Event) => {
        // For submit buttons, we need to prevent the dropdown from closing immediately to allow the form submission to complete properly
        if (renderSubmitButton) {
            event.preventDefault();
        }

        props.onSelect?.(event);
    };

    const defaultIcon = renderLink ? IconType.LINK_EXTERNAL : selected ? IconType.CHECKMARK : undefined;
    const processedIcon = icon ?? defaultIcon;

    return (
        <RadixDropdown.Item
            disabled={disabled}
            asChild={renderLink || renderSubmitButton}
            className={classNames(
                'flex items-center gap-3 px-4 py-3', // Layout
                'cursor-pointer rounded-xl text-base leading-tight focus-visible:outline-hidden', // Style
                'data-disabled:bg-neutral-0 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:text-neutral-300', // Disabled
                { 'bg-neutral-0 text-neutral-500': !selected && !disabled }, // Not selected
                { 'bg-neutral-50 text-neutral-800': selected && !disabled }, // Selected
                { 'hover:bg-neutral-50 hover:text-neutral-800': !disabled }, // Hover
                { 'data-highlighted:bg-neutral-50 data-highlighted:text-neutral-800': !disabled }, // Highlighted
                { 'flex-row justify-between': iconPosition === 'right' },
                { 'flex-row-reverse justify-end': iconPosition === 'left' && icon != null },
                className,
            )}
            onSelect={handleSelect}
            {...otherProps}
        >
            <ItemWrapper {...itemWrapperProps}>
                <p className="truncate">{children}</p>
                {processedIcon != null && <Icon icon={processedIcon} size="md" className="text-neutral-300" />}
            </ItemWrapper>
        </RadixDropdown.Item>
    );
};
