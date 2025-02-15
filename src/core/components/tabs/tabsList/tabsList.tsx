import { TabsList as RadixTabsList } from '@radix-ui/react-tabs';
import classNames from 'classnames';
import { Children, useContext, type ComponentProps } from 'react';
import { TabsContext } from '../tabsRoot/tabsRoot';

export interface ITabsListProps extends ComponentProps<'div'> {}

export const TabsList: React.FC<ITabsListProps> = (props) => {
    const { children, className, ...otherProps } = props;
    const { isUnderlined } = useContext(TabsContext);

    const tabsListClassNames = classNames('flex gap-x-6', { 'border-b border-neutral-100': isUnderlined }, className);

    /* If there is only a single child then the tabs are redundant and we just show the content
    In this case we don't render the tabs list. Note that we should always set either a defaultValue or value
    prop on the Tabs.Root component if there is a possibility of only a single child being present
    Otherwise no tab will be selected and no content will render */
    if (Children.count(children) === 1) {
        return null;
    }

    return (
        <RadixTabsList className={tabsListClassNames} {...otherProps}>
            {children}
        </RadixTabsList>
    );
};
