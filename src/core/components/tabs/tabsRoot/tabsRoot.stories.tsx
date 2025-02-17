import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, type ITabsRootProps } from '..';
import { Card } from '../../cards';
import { IconType } from '../../icon';

/**
 * Tabs.Root can contain multiple Tabs.Triggers inside it's requisite Tabs.List. These tabs will coordinate with what Tabs.Content to show by matching their value prop.
 */
const meta: Meta<typeof Tabs.Root> = {
    title: 'Core/Components/Tabs/Tabs.Root',
    component: Tabs.Root,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?m=auto&node-id=15855%3A27684',
        },
    },
};

type Story = StoryObj<typeof Tabs.Root>;

const reusableStoryComponent = (props: ITabsRootProps) => {
    return (
        <Tabs.Root {...props}>
            <Tabs.List>
                <Tabs.Trigger label="Default Tab" value="1" />
                <Tabs.Trigger label="Disabled Tab" value="2" disabled={true} />
                <Tabs.Trigger label="Icon Tab" value="3" iconRight={IconType.BLOCKCHAIN_BLOCK} />
            </Tabs.List>
            <Tabs.Content value="1">
                <div className="flex h-24 w-96 items-center justify-center border border-dashed border-info-300 bg-info-100">
                    Item 1 Content
                </div>
            </Tabs.Content>
            <Tabs.Content value="2">
                <div className="flex h-24 w-96 items-center justify-center border border-dashed border-info-300 bg-info-100">
                    Item 2 Content
                </div>
            </Tabs.Content>
            <Tabs.Content value="3">
                <div className="flex h-24 w-96 items-center justify-center border border-dashed border-info-300 bg-info-100">
                    Item 3 Content
                </div>
            </Tabs.Content>
        </Tabs.Root>
    );
};

/**
 * Default usage example of a full Tabs component.
 */
export const Default: Story = {
    args: {},
    render: (args) => reusableStoryComponent(args),
};

/**
 * Usage example of a Tabs component with the isUnderlined prop set to true.
 */
export const Underlined: Story = {
    args: { isUnderlined: true },
    render: (args) => reusableStoryComponent(args),
};

/**
 * Usage example of a Tabs component inside a Card component with the defaultValue set.
 */
export const InsideCard: Story = {
    args: { defaultValue: '3' },
    render: (args) => <Card className="p-6">{reusableStoryComponent(args)}</Card>,
};

/**
 * Usage example of a Tabs component with a single tab with the default value.
 * Make sure to set the `defaultValue` or `value` property to select and show the content of the tab.
 */
export const SingleTab: Story = {
    args: { defaultValue: '1' },
    render: (args) => (
        <Tabs.Root {...args}>
            <Tabs.List>
                <Tabs.Trigger label="Default Tab" value="1" />
            </Tabs.List>
            <Tabs.Content value="1">
                <div className="flex h-24 w-96 items-center justify-center border border-dashed border-info-300 bg-info-100">
                    Item 1 Content
                </div>
            </Tabs.Content>
        </Tabs.Root>
    ),
};

export default meta;
