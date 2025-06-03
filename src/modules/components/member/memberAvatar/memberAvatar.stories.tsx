import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemberAvatar } from './memberAvatar';

const meta: Meta<typeof MemberAvatar> = {
    title: 'Modules/Components/Member/MemberAvatar',
    component: MemberAvatar,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?type=design&node-id=14385%3A24287&mode=dev&t=IX3Fa96hiwUEtcoA-1',
        },
    },
};

type Story = StoryObj<typeof MemberAvatar>;

/**
 * Default usage example of the MemberAvatar component.
 */
export const Default: Story = {};

/**
 * Usage example of the MemberAvatar component with an address without an ENS name
 */
export const Address: Story = {
    args: {
        address: '0x246503df057A9a85E0144b6867a828c99676128B',
    },
};

/**
 * Usage example of the MemberAvatar component with an ENS name
 */
export const EnsAvatar: Story = {
    args: {
        ensName: 'vitalik.eth',
    },
};

/**
 * Usage example of the MemberAvatar component with a custom avatar logo
 */
export const CustomAvatar: Story = {
    args: {
        avatarSrc: 'https://aragon-1.mypinata.cloud/ipfs/QmX4q3fu1QkSfdVFUAmSUWziCmnXtitp2TVKLbrFVBcPvv',
    },
};

export default meta;
