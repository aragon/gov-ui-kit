import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { DefinitionList, type IDefinitionListItemProps } from '../index';

const meta: Meta<typeof DefinitionList.Item> = {
    title: 'Core/Components/DefinitionList/DefinitionList.Item',
    component: DefinitionList.Item,
    decorators: (Story: ComponentType) => (
        <DefinitionList.Container>
            <Story />
        </DefinitionList.Container>
    ),
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
        term: 'First Item Term',
        children: 'First item description',
    },
};

/**
 * Example usage of the DefinitionList.Item component with component child as definition description.
 */
export const WithComponent: Story = {
    args: {
        term: 'First Item Term',
    },
    render: (props: IDefinitionListItemProps) => (
        <DefinitionList.Item {...props}>
            <div className="flex h-96 w-full items-center justify-center border border-dashed bg-success-100">
                Any React Node Child
            </div>
        </DefinitionList.Item>
    ),
};

export const WithLink: Story = {
    args: {
        term: 'Website',
        link: {
            href: 'https://www.example.com',
        },
    },
    render: (props: IDefinitionListItemProps) => <DefinitionList.Item {...props}>Homepage</DefinitionList.Item>,
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

export default meta;
