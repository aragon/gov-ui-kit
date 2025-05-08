import { TabsTrigger as RadixTabsTrigger } from '@radix-ui/react-tabs';
import classNames from 'classnames';
import { useContext, type ComponentProps } from 'react';
import { Icon, type IconType } from '../../icon';
import { TabsContext } from '../tabsRoot/tabsRoot';

export interface ITabsTriggerProps extends ComponentProps<'button'> {
    /**
     * The label of the tab.
     */
    label: string;
    /**
     * Value linking Tabs.Trigger to its corresponding Tabs.Content
     */
    value: string;
    /**
     * The icon to display on the right side of the tab label.
     */
    iconRight?: IconType;
}

export const TabsTrigger: React.FC<ITabsTriggerProps> = (props) => {
    const { label, iconRight, className, value, disabled, ...otherProps } = props;
    const { isUnderlined } = useContext(TabsContext);

    const triggerClassNames = classNames(
        'group line-clamp-1 flex items-center gap-x-4 rounded-t border-primary-400 py-3 text-base font-normal leading-tight', // Base
        'active:data-[state=active]:text-neutral-800 active:data-[state=active]:shadow-[inset_0_0_0_0,0_1px_0_0] active:data-[state=active]:shadow-primary-400', // Active state
        'focus:outline-hidden', // Focus state
        { 'hover:shadow-[inset_0_0_0_0,0_1px_0_0] hover:shadow-neutral-800': isUnderlined && !disabled }, //  Underlined & enabled variant
        'data-[state=active]:text-neutral-800 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-primary-400', // Active selection
        { 'cursor-pointer text-neutral-500 hover:text-neutral-800': !disabled }, // Enabled state
        { 'text-neutral-300': disabled }, // Disabled state
        className,
    );

    const iconClassNames = classNames(
        'group-data-[state=active]:text-neutral-800', // Base
        { 'text-neutral-200': disabled }, // Disabled state
        { 'text-neutral-500 group-hover:text-neutral-300': !disabled }, // Enabled state
        { 'group-focus:text-neutral-500 group-active:text-neutral-600': !disabled }, // Enabled & Active/Focus states
    );

    return (
        <RadixTabsTrigger className={triggerClassNames} value={value} disabled={disabled} {...otherProps}>
            {label}
            {iconRight && <Icon icon={iconRight} size="sm" className={iconClassNames} />}
        </RadixTabsTrigger>
    );
};
