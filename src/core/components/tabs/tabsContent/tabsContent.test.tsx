import { render, screen } from '@testing-library/react';
import { type ITabsContentProps, Tabs } from '../../tabs';

describe('<Tabs.Content /> component', () => {
    const createTestComponent = (props?: Partial<ITabsContentProps>) => {
        const completeProps: ITabsContentProps = {
            value: '1',
            ...props,
        };
        return (
            <Tabs.Root>
                <Tabs.Content {...completeProps} />
            </Tabs.Root>
        );
    };

    it('should render content without crashing', () => {
        const children = 'Item Content';
        const forceMount = true;
        render(createTestComponent({ children, forceMount }));

        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
