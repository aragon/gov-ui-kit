import { ProposalActionsContainer } from './proposalActionsContainer';
import { ProposalActionsFooter } from './proposalActionsFooter';
import { ProposalActionsItem } from './proposalActionsItem';
import { ProposalActionsRoot } from './proposalActionsRoot';

export const ProposalActions = {
    Root: ProposalActionsRoot,
    Container: ProposalActionsContainer,
    Item: ProposalActionsItem,
    Footer: ProposalActionsFooter,
};

export * from './proposalActionsContainer';
export * from './proposalActionsDefinitions';
export * from './proposalActionsItem';
export * from './proposalActionsList';
