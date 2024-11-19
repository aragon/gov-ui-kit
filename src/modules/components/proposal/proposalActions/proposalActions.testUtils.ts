import type { IProposalActionsContext } from './proposalActionsContext';
import type { IProposalAction } from './types';

export const generateProposalAction = (action?: Partial<IProposalAction>): IProposalAction => ({
    type: 'unknownType',
    from: '0xFrom',
    to: '0xTo',
    data: '',
    value: '0',
    inputData: null,
    ...action,
});

export const generateProposalActionContext = (values?: Partial<IProposalActionsContext>): IProposalActionsContext => ({
    actionsCount: 0,
    setExpandedActions: jest.fn(),
    expandedActions: [],
    ...values,
});
