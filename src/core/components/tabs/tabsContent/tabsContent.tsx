import { TabsContent as RadixTabsContent } from '@radix-ui/react-tabs';
import type { ComponentProps } from 'react';

export interface ITabsContentProps extends ComponentProps<'div'> {
    /**
     * Value linking Tabs.Content to its corresponding Tabs.Trigger
     */
    value: string;
    /**
     * When `true`, the content will stay mounted even when inactive.
     */
    forceMount?: true;
}

export const TabsContent: React.FC<ITabsContentProps> = (props) => {
    return <RadixTabsContent {...props} />;
};
