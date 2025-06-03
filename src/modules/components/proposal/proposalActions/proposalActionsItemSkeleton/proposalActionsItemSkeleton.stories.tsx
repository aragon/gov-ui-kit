import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProposalActions } from '../index';

const meta: Meta<typeof ProposalActions.ItemSkeleton> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.ItemSkeleton',
    component: ProposalActions.ItemSkeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?m=auto&node-id=16738-8439',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.ItemSkeleton>;

/**
 * Default usage example of the ProposalActionsItemSkeleton module component.
 */
export const Default: Story = {
    render: () => {
        return (
            <ProposalActions.Root actionsCount={1} isLoading={true}>
                <ProposalActions.Container emptyStateDescription="Proposal has no actions" />
            </ProposalActions.Root>
        );
    },
};

export default meta;
