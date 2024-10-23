import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { Tabs } from '..';
import { IconType } from '../../icon';

const ComponentWrapper = (Story: ComponentType) => (
    <Tabs.Root>
        <Tabs.List>
            <Story />
        </Tabs.List>
    </Tabs.Root>
);

const meta: Meta<typeof Tabs.Trigger> = {
    title: 'Core/Components/Tabs/Tabs.Trigger',
    component: Tabs.Trigger,
    decorators: ComponentWrapper,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?m=auto&node-id=15855%3A27684',
        },
    },
};

type Story = StoryObj<typeof Tabs.Trigger>;

/**
 * Default usage example of a single Tabs.Trigger component.
 */
export const Default: Story = {
    args: {
        label: 'Example',
        value: 'example',
    },
};

/**
 * Default usage example of a single Tabs.Trigger component.
 */
export const Disabled: Story = {
    args: {
        label: 'Disabled tab',
        value: 'disabled',
        iconRight: IconType.APP_ASSETS,
        disabled: true,
    },
};

export default meta;
