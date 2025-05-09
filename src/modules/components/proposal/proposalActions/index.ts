import { ProposalActionsContainer } from './proposalActionsContainer';
import { ProposalActionsFooter } from './proposalActionsFooter';
import { ProposalActionsItem } from './proposalActionsItem';
import { ProposalActionsItemSkeleton } from './proposalActionsItemSkeleton';
import { ProposalActionsRoot } from './proposalActionsRoot';

export const ProposalActions = {
    Root: ProposalActionsRoot,
    Container: ProposalActionsContainer,
    Item: ProposalActionsItem,
    Skeleton: ProposalActionsItemSkeleton,
    Footer: ProposalActionsFooter,
};

export * from './proposalActionsContainer';
export * from './proposalActionsDefinitions';
export * from './proposalActionsFooter';
export * from './proposalActionsItem';
export * from './proposalActionsItemSkeleton';
export * from './proposalActionsList';
export * from './proposalActionsRoot';
