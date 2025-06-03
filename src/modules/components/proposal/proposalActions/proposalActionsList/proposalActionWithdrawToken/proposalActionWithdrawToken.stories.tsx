import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProposalActionWithdrawToken } from './proposalActionWithdrawToken';
import { generateProposalActionWithdrawToken } from './proposalActionWithdrawToken.testUtils';

const meta: Meta<typeof ProposalActionWithdrawToken> = {
    title: 'Modules/Components/Proposal/ProposalActions/Actions/WithdrawToken',
    component: ProposalActionWithdrawToken,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=17330-117338&t=tQiF5klPD9cjUit6-4',
        },
    },
};

type Story = StoryObj<typeof ProposalActionWithdrawToken>;

/**
 * Usage example of the ProposalActions module component with mocked TokenWithdraw actions.
 */
export const Default: Story = {
    args: {
        action: generateProposalActionWithdrawToken({
            sender: { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
            receiver: { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', name: 'vitalik.eth' },
            token: {
                name: 'Shiba Inu',
                symbol: 'SHIB',
                logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
                priceUsd: '0.00002459',
                decimals: 18,
                address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
            },
            amount: '9784653197',
        }),
    },
};

export default meta;
