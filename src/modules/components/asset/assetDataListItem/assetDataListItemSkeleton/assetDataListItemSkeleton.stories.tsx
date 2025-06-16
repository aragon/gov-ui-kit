import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssetDataListItem } from '../../assetDataListItem';

const meta: Meta<typeof AssetDataListItem.Skeleton> = {
    title: 'Modules/Components/Asset/AssetDataListItem/AssetDataListItem.Skeleton',
    component: AssetDataListItem.Skeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?type=design&node-id=14367%3A10050&mode=design&t=rWmhVzPc3Ay010jV-1',
        },
    },
};

type Story = StoryObj<typeof AssetDataListItem.Skeleton>;

/**
 * Default usage example of the DaoDataListItemSkeleton component.
 */
export const Default: Story = {};

export default meta;
