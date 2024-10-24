import type { Meta, StoryObj } from '@storybook/react';
import { MemberDataListItemStructure } from './memberDataListItemStructure';

const meta: Meta<typeof MemberDataListItemStructure> = {
    title: 'Modules/Components/Member/MemberDataListItem/MemberDataListItem.Structure',
    component: MemberDataListItemStructure,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?type=design&node-id=14385%3A30819&mode=dev',
        },
    },
};

type Story = StoryObj<typeof MemberDataListItemStructure>;

/**
 * Default usage example of the MemberDataList module component.
 */
export const Default: Story = {
    args: {
        address: '0x1234567890123456789012345678901234567890',
    },
};

/**
 * Example of the MemberDataList module component with a TokenVoting member without voting power.
 */
export const TokenMemberWithoutVotingPower: Story = {
    args: {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        tokenAmount: 0,
    },
};

/**
 * Example of the MemberDataList module component with a TokenVoting member with voting power.
 */
export const TokenMemberWithVotingPower: Story = {
    args: {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        delegationCount: 0,
        tokenAmount: 4820,
    },
};

/**
 * Example of the MemberDataList module component with complete props.
 */
export const Complete: Story = {
    args: {
        isDelegate: true,
        ensName: 'vitalik.eth',
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        delegationCount: 9,
        tokenAmount: 13370,
        tokenSymbol: 'PDC',
    },
};

export default meta;
