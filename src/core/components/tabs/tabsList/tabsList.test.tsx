// TabsRoot.test.tsx
import { render, screen } from '@testing-library/react';
import { Tabs, type ITabsListProps } from '../../tabs';

describe('<Tabs.Root /> component', () => {
    const createSingleTabTestComponent = (props?: Partial<ITabsListProps>) => {
        const completeProps: ITabsListProps = { ...props };
        return (
            <Tabs.Root>
                <Tabs.List {...completeProps}>
                    <Tabs.Trigger label="Tab 1" value="1" />
                </Tabs.List>
            </Tabs.Root>
        );
    };
    const createMultiTabsTestComponent = (props?: Partial<ITabsListProps>) => {
        const completeProps: ITabsListProps = { ...props };
        return (
            <Tabs.Root>
                <Tabs.List {...completeProps}>
                    <Tabs.Trigger label="Tab 1" value="1" />
                    <Tabs.Trigger label="Tab 2" value="2" />
                </Tabs.List>
            </Tabs.Root>
        );
    };

    it('should render multiple tab triggers without crashing', () => {
        render(createMultiTabsTestComponent());

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
    });

    it('should render null when only a single tab trigger is present', () => {
        render(createSingleTabTestComponent());

        expect(screen.queryByText('Tab 1')).not.toBeInTheDocument();
    });
});
