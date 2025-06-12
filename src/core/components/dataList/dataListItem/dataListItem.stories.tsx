import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../index';

const meta: Meta<typeof DataList.Item> = {
    title: 'Core/Components/DataList/DataList.Item',
    component: DataList.Item,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
        },
    },
};

type Story = StoryObj<typeof DataList.Item>;

/**
 * Default usage example of the DataList.Item component.
 */
export const Default: Story = {
    args: {
        children: 'Data list item',
        className: 'flex items-center min-h-12',
    },
};

/**
 * Usage of the DataList.Item component as link.
 */
export const Link: Story = {
    args: {
        children: 'Link data list item',
        href: 'https://aragon.org',
        target: '_blank',
        className: 'flex items-center min-h-12',
    },
};

/**
 * Usage of the DataList.Item component as button.
 */
export const Button: Story = {
    args: {
        children: 'Button data list item',
        onClick: () => null,
        className: 'min-h-12',
    },
};

export default meta;
