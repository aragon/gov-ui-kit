import { render, screen } from '@testing-library/react';
import { IconType } from '../../icon';
import { Tabs, type ITabsTriggerProps } from '../../tabs';

describe('<Tabs.Trigger /> component', () => {
    const createTestComponent = (tabs: ITabsTriggerProps[]) => (
        <Tabs.Root defaultValue="1">
            <Tabs.List>
                {tabs.map((props, index) => (
                    <Tabs.Trigger key={index} {...props} />
                ))}
            </Tabs.List>
        </Tabs.Root>
    );

    it('renders a tab', () => {
        render(
            createTestComponent([
                { label: 'Tab 1', value: '1' },
                { label: 'Tab 2', value: '2' },
            ]),
        );

        const tab = screen.getByRole('tab', { name: 'Tab 1' });
        expect(tab).toBeInTheDocument();
        expect(tab.getAttribute('disabled')).toBeNull();
    });

    it('renders the icon when iconRight is provided', () => {
        const iconRight = IconType.BLOCKCHAIN_BLOCK;
        render(
            createTestComponent([
                { label: 'Tab 1', value: '1', iconRight },
                { label: 'Tab 2', value: '2' },
            ]),
        );

        expect(screen.getByTestId(iconRight)).toBeInTheDocument();
    });

    it('disables the tab when the disabled property is set to true', () => {
        render(
            createTestComponent([
                { label: 'Tab 1', value: '1', disabled: true },
                { label: 'Tab 2', value: '2' },
            ]),
        );

        const tab = screen.getByRole('tab', { name: 'Tab 1' });
        expect(tab.getAttribute('disabled')).toEqual('');
    });

    it('does not render the Tabs.List or Tabs.Trigger in a single tab setup', () => {
        render(createTestComponent([{ label: 'Tab 1', value: '1' }]));
        expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    });
});
