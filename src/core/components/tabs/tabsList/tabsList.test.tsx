import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Tabs } from '../../tabs';

describe('<Tabs.List /> component', () => {
    const createTestComponent = (children: ReactNode) => (
        <Tabs.Root>
            <Tabs.List>{children}</Tabs.List>
        </Tabs.Root>
    );

    it('should render multiple tab triggers without crashing', () => {
        render(
            createTestComponent([
                <Tabs.Trigger key="1" label="Tab 1" value="1" />,
                <Tabs.Trigger key="2" label="Tab 2" value="2" />,
            ]),
        );

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
    });

    it('should render null when only a single tab trigger is present', () => {
        render(createTestComponent(<Tabs.Trigger label="Tab 1" value="1" />));

        expect(screen.queryByText('Tab 1')).not.toBeInTheDocument();
    });
});
