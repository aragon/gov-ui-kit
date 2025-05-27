import { type TagVariant } from '../../../core';

export type VoteIndicator = 'yes' | 'no' | 'abstain' | 'approve' | 'veto';

export const getTagVariant = (voteIndicator: VoteIndicator, isVeto?: boolean): TagVariant => {
    switch (voteIndicator) {
        case 'yes':
            return isVeto ? 'critical' : 'success';
        case 'no':
            return isVeto ? 'success' : 'critical';
        case 'veto':
            return 'critical';
        case 'approve':
            return 'success';
        case 'abstain':
            return 'neutral';
    }
};
