import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProposalDataListItem, ProposalStatus } from '../../index';

const meta: Meta<typeof ProposalDataListItem.Structure> = {
    title: 'Modules/Components/Proposal/ProposalDataListItem/ProposalDataListItem.Structure',
    component: ProposalDataListItem.Structure,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalDataListItem.Structure>;

/**
 * Default usage example of the `ProposalDataListItem.Structure` module component.
 */
export const Default: Story = {
    args: {
        date: 1728637284503,
        status: ProposalStatus.ACCEPTED,
        title: 'Funding testnet of Unichain',
        summary:
            'This covers the fees associated with the final development on the Unichain Testnet and development of the bridge for the mainnet.',
        publisher: { address: '0x17C6808fA04DC9de98eaCfeb4c66B352067c1cDD' },
    },
};

/**
 * Example of the `ProposalDataListItem.Structure` module component for a multi-body proposal.
 */
export const MultiBody: Story = {
    args: {
        date: Date.now() + 1000000,
        status: ProposalStatus.ACTIVE,
        statusContext: 'Stage 1',
        title: 'Partnering with WalletConnect on Social Media',
        summary:
            'This is round 1 of our community engagement and building gamfi strategy with our marketing team partnership.',
        id: 'PIP-1',
        publisher: [
            { address: '0x17366cae2b9c6C3055e9e3C78936a69006BE5409', name: 'cgero.eth', link: undefined },
            { address: '0x9d0920D3D7c9F28baF0abed7f2E26A5126cc0786', name: 'Bob the Builder', link: undefined },
            { address: '0xd5fb864ACfD6BB2f72939f122e89fF7F475924f5', name: 'sio.eth' },
            { address: '0xbC7f20ebB9AeDe6DF4965eCAAcfBb24927Ae16E7' },
        ],
    },
};

/**
 * Usage example of the `ProposalDataListItem.Structure` with custom proposal results UI.
 */
export const CustomResults: Story = {
    args: {
        date: 1728637491379,
        status: ProposalStatus.FAILED,
        title: 'A proposal with custom results',
        summary: 'Pass the custom proposal results as children property to render a custom UI.',
        publisher: { address: '0x17C6808fA04DC9de98eaCfeb4c66B352067c1cDD' },
        children: (
            <div className="border-info-300 bg-info-100 flex h-24 w-full items-center justify-center border border-dashed">
                Custom results breakdown
            </div>
        ),
    },
};

export default meta;
