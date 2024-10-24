import type { Meta, StoryObj } from '@storybook/react';
import { TransactionDataListItem } from '../../../..';

const meta: Meta<typeof TransactionDataListItem.Skeleton> = {
    title: 'Modules/Components/Transaction/TransactionDataListItem/TransactionDataListItem.Skeleton',
    component: TransactionDataListItem.Skeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?m=auto&node-id=14423%3A35617&t=PnXohTqw3z2FEaam-1',
        },
    },
};

type Story = StoryObj<typeof TransactionDataListItem.Skeleton>;

/**
 * Default usage example of the TransactionDataListItem.Skeleton component.
 */
export const Default: Story = {};

export default meta;
