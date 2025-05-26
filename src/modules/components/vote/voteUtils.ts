import { type TagVariant } from '../../../core';

export type VoteIndicator = 'yes' | 'no' | 'yesVeto' | 'noVeto' | 'abstain' | 'approve' | 'veto';

export const voteIndicatorToTagVariant: Record<VoteIndicator, TagVariant> = {
    yes: 'success',
    no: 'critical',
    yesVeto: 'critical',
    noVeto: 'success',
    abstain: 'neutral',
    approve: 'success',
    veto: 'critical',
};

export const voteIndicatorToLabel: Record<VoteIndicator, string> = {
    yes: 'Yes',
    no: 'No',
    yesVeto: 'Yes',
    noVeto: 'No',
    abstain: 'Abstain',
    approve: 'Approve',
    veto: 'Veto',
};
