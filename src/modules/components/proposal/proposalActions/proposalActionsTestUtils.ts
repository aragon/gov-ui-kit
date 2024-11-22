import type { IProposalActionsContext } from './proposalActionsContext';
import type { IProposalAction } from './proposalActionsDefinitions';

export const generateProposalAction = (action?: Partial<IProposalAction>): IProposalAction => ({
    type: 'unknownType',
    from: '0x25716fB10298638eD386A5A5dD2E9233D213F442',
    to: '0xC8da4C1d9BB59DD32ac39A925933188b7c66c311',
    data: '',
    value: '0',
    inputData: null,
    ...action,
});

export const generateProposalActionsContext = (values?: Partial<IProposalActionsContext>): IProposalActionsContext => ({
    actionsCount: 0,
    setActionsCount: jest.fn(),
    expandedActions: [],
    setExpandedActions: jest.fn(),
    ...values,
});
