import type { TagVariant } from '../../../core';

export enum ProposalStatus {
    ACCEPTED = 'ACCEPTED',
    ACTIVE = 'ACTIVE',
    ADVANCEABLE = 'ADVANCEABLE',
    DRAFT = 'DRAFT',
    EXECUTED = 'EXECUTED',
    EXPIRED = 'EXPIRED',
    FAILED = 'FAILED',
    PENDING = 'PENDING',
    EXECUTABLE = 'EXECUTABLE',
    REJECTED = 'REJECTED',
    VETOED = 'VETOED',
    UNREACHED = 'UNREACHED',
}

export const proposalStatusToTagVariant: Record<ProposalStatus, TagVariant> = {
    [ProposalStatus.ACCEPTED]: 'success',
    [ProposalStatus.ACTIVE]: 'info',
    [ProposalStatus.ADVANCEABLE]: 'info',
    [ProposalStatus.DRAFT]: 'neutral',
    [ProposalStatus.EXECUTED]: 'success',
    [ProposalStatus.EXPIRED]: 'critical',
    [ProposalStatus.FAILED]: 'critical',
    [ProposalStatus.PENDING]: 'neutral',
    [ProposalStatus.EXECUTABLE]: 'info',
    [ProposalStatus.REJECTED]: 'critical',
    [ProposalStatus.VETOED]: 'critical',
    [ProposalStatus.UNREACHED]: 'neutral',
};
