import { render, screen } from '@testing-library/react';
import { type ITabsListProps, Tabs } from '../../tabs';

describe('<Tabs.List /> component', () => {
    const createTestComponent = (props?: Partial<ITabsListProps>) => {
        const completeProps: ITabsListProps = {
            ...props,
        };

        return (
            <Tabs.Root>
                <Tabs.List {...completeProps} />
            </Tabs.Root>
        );
    };

    it('renders multiple tab triggers', () => {
        const children = [
            <Tabs.Trigger key="1" label="Tab 1" value="1" />,
            <Tabs.Trigger key="2" label="Tab 2" value="2" />,
        ];
        render(createTestComponent({ children }));

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
    });

    it('renders null when only a single tab trigger is present', () => {
        const children = <Tabs.Trigger label="Tab 1" value="1" />;
        render(createTestComponent({ children }));

        expect(screen.queryByText('Tab 1')).not.toBeInTheDocument();
    });
});
