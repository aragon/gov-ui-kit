import { TabsList as RadixTabsList, Tabs as RadixTabsRoot } from '@radix-ui/react-tabs';
import { render, screen } from '@testing-library/react';
import { IconType } from '../../icon';
import { Tabs, type ITabsTriggerProps } from '../../tabs';

describe('<Tabs.Trigger /> component', () => {
    const createTestComponent = (props?: Partial<ITabsTriggerProps>) => {
        const completeProps: ITabsTriggerProps = {
            label: 'Tab 1',
            value: '1',
            ...props,
        };

        return (
            <RadixTabsRoot>
                <RadixTabsList>
                    <Tabs.Trigger {...completeProps} />
                </RadixTabsList>
            </RadixTabsRoot>
        );
    };

    it('renders a tab', () => {
        render(createTestComponent());
        const tab = screen.getByRole('tab', { name: 'Tab 1' });
        expect(tab).toBeInTheDocument();
        expect(tab.getAttribute('disabled')).toBeNull();
    });

    it('renders the icon when iconRight is provided', () => {
        const iconRight = IconType.BLOCKCHAIN_BLOCK;
        render(createTestComponent({ iconRight }));
        expect(screen.getByTestId(iconRight)).toBeInTheDocument();
    });

    it('disables the tab when the disabled property is set to true', () => {
        render(createTestComponent({ disabled: true }));
        const tab = screen.getByRole('tab', { name: 'Tab 1' });
        expect(tab.getAttribute('disabled')).toEqual('');
    });
});
