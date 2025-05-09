import type { Meta, StoryObj } from '@storybook/react';
import { ProposalActions } from '../index';

const meta: Meta<typeof ProposalActions.Skeleton> = {
    title: 'Modules/Components/Proposal/ProposalActions/ProposalActions.Skeleton',
    component: ProposalActions.Skeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?m=auto&node-id=16738-8439',
        },
    },
};

type Story = StoryObj<typeof ProposalActions.Skeleton>;

/**
 * Default usage example of the ProposalActionsItemSkeleton module component.
 */
export const Default: Story = {
    render: () => {
        return (
            <ProposalActions.Root rawActionsCount={1} isLoading={true}>
                <ProposalActions.Container emptyStateDescription="Proposal has no actions">
                    <ProposalActions.Skeleton />
                </ProposalActions.Container>
            </ProposalActions.Root>
        );
    },
};

export default meta;
