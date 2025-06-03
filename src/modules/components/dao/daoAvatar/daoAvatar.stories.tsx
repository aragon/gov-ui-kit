import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DaoAvatar } from './daoAvatar';

const meta: Meta<typeof DaoAvatar> = {
    title: 'Modules/Components/Dao/DaoAvatar',
    component: DaoAvatar,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=14367-12084&mode=design&t=NmENrVg9Tu4bYxv2-4',
        },
    },
};

type Story = StoryObj<typeof DaoAvatar>;

/**
 * Default usage example of the DaoAvatar component.
 */
export const Default: Story = {
    args: {
        name: 'Aragon DAO',
        src: 'https://aragon-1.mypinata.cloud/ipfs/QmX4q3fu1QkSfdVFUAmSUWziCmnXtitp2TVKLbrFVBcPvv',
    },
};

/**
 *  Usage of the DaoAvatar without an image src.
 */
export const Fallback: Story = {
    args: {
        name: 'Patito Dao',
    },
};

export default meta;
