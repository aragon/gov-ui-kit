import { TabsList as RadixTabsList } from '@radix-ui/react-tabs';
import classNames from 'classnames';
import { Children, useContext, type ComponentProps } from 'react';
import { TabsContext } from '../tabsRoot/tabsRoot';

export interface ITabsListProps extends ComponentProps<'div'> {}

export const TabsList: React.FC<ITabsListProps> = (props) => {
    const { children, className, ...otherProps } = props;
    const { isUnderlined } = useContext(TabsContext);

    const tabsListClassNames = classNames('flex gap-x-6', { 'border-b border-neutral-100': isUnderlined }, className);

    // Only render the tabs list if there's more than one child
    // If there is a possibility of only a single tab then we must set either defaultValue or value property
    // on the Tabs.Root component.
    if (Children.count(children) === 1) {
        return null;
    }

    return (
        <RadixTabsList className={tabsListClassNames} {...otherProps}>
            {children}
        </RadixTabsList>
    );
};
