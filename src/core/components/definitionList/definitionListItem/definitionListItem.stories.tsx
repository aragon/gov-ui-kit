import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { ComponentType } from 'react';
import { DefinitionList, type IDefinitionListItemProps } from '../index';

const ComponentWrapper = (Story: ComponentType) => (
    <DefinitionList.Container>
        <Story />
    </DefinitionList.Container>
);

const meta: Meta<typeof DefinitionList.Item> = {
    title: 'Core/Components/DefinitionList/DefinitionList.Item',
    component: DefinitionList.Item,
    decorators: ComponentWrapper,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?m=auto&node-id=16728%3A45615&t=Q593Geqalm4meMTS-1',
        },
    },
};

type Story = StoryObj<typeof DefinitionList.Item>;

/**
 * Default usage of the DefinitionList.Item component.
 */
export const Default: Story = {
    args: {
        term: 'Item term',
        children: 'Item description',
    },
};

/**
 * Example usage of the DefinitionList.Item component with component child as definition description.
 */
export const WithComponent: Story = {
    args: {
        term: 'With component term',
    },
    render: (props: IDefinitionListItemProps) => (
        <DefinitionList.Item {...props}>
            <div className="bg-success-100 flex h-96 w-full items-center justify-center border border-dashed">
                Any React Node Child
            </div>
        </DefinitionList.Item>
    ),
};

/**
 * Use the link property to render the item as a link.
 */
export const WithLink: Story = {
    args: {
        term: 'Website',
        link: { href: 'https://app.aragon.org' },
        children: 'Homepage',
    },
};

/**
 * Usage of the DefinitionList.Item component with a truncated long string.
 */
export const TruncateDefinition: Story = {
    args: {
        term: 'Long string',
    },
    render: (props: IDefinitionListItemProps) => (
        <DefinitionList.Item {...props}>
            <div className="truncate">
                5731588298112881474677942504380315442995089605930142380990784283931790335308357315882981128814746779425043803154429950896059301423809907842839317903353083
            </div>
        </DefinitionList.Item>
    ),
};

/**
 * Use the description property to add a description to the definition list item.
 */
export const WithHelpText: Story = {
    args: {
        term: 'Operating System',
        link: { href: 'https://app.aragon.org' },
        children: '0x1234...1234',
        description: 'Aragon OSx v1.4',
    },
};

/**
 * Use the copyValue property to render a copy icon and allow users to copy the defined value on the clipboard.
 */
export const WithCopyValue: Story = {
    args: {
        term: 'Token Voting',
        copyValue: '0xba9E9Be7859560EF2805476f7997cD4ebE7BaF27',
        children: '0xba9E...27',
    },
};

export default meta;
