import type { Meta, StoryObj } from '@storybook/react-vite';
import { VoteDataListItem } from '..';

const meta: Meta<typeof VoteDataListItem.Skeleton> = {
    title: 'Modules/Components/Vote/VoteDataListItem/VoteDataListItem.Skeleton',
    component: VoteDataListItem.Skeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?m=auto&node-id=14385%3A25034&t=E0kPRQYhJqWbVmAh-1',
        },
    },
};

type Story = StoryObj<typeof VoteDataListItem.Skeleton>;

/**
 * Default usage example of the VoteDataListItem.Skeleton component.
 */
export const Default: Story = {};

export default meta;
