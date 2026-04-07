import { Tabs as RadixTabsRoot } from '@radix-ui/react-tabs';
import { type ComponentPropsWithoutRef, createContext, forwardRef, useMemo } from 'react';

export interface ITabsRootProps extends ComponentPropsWithoutRef<typeof RadixTabsRoot> {
    /**
     * The value of the tab that should be selected by default.
     */
    defaultValue?: string;
    /**
     * The value of the selected tab.
     */
    value?: string;
    /**
     * Callback when the value changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * Whether the Tabs.List should use an underlined style. @default false
     */
    isUnderlined?: boolean;
}

export interface ITabsContext {
    /**
     * Whether the tabs share a common underline style implementation via the Tabs.List.
     */
    isUnderlined: boolean;
}

export const TabsContext = createContext<ITabsContext>({ isUnderlined: false });

export const TabsRoot = forwardRef<HTMLDivElement, ITabsRootProps>((props, ref) => {
    const { children, isUnderlined = false, defaultValue, value, onValueChange, ...otherProps } = props;
    const tabsContextValue = useMemo(() => ({ isUnderlined }), [isUnderlined]);

    return (
        <RadixTabsRoot
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            orientation="horizontal"
            ref={ref}
            value={value}
            {...otherProps}
        >
            <TabsContext.Provider value={tabsContextValue}>{children}</TabsContext.Provider>
        </RadixTabsRoot>
    );
});

TabsRoot.displayName = 'TabsRoot';
