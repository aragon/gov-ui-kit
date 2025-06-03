import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { VoteProposalDataListItem } from '..';

const meta: Meta<typeof VoteProposalDataListItem.Skeleton> = {
    title: 'Modules/Components/Vote/VoteProposalDataListItem/VoteProposalDataListItem.Skeleton',
    component: VoteProposalDataListItem.Skeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=17239-29368&m',
        },
    },
};

type Story = StoryObj<typeof VoteProposalDataListItem.Skeleton>;

/**
 * Default usage example of the VoteProposalDataListItem.Skeleton component.
 */
export const Default: Story = {};

export default meta;
