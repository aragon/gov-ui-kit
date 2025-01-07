import type { IDataListItemProps } from '../../../../../core';
import { type ICompositeAddress, type IWeb3ComponentProps } from '../../../../types';
import { type ProposalStatus } from '../../proposalUtils';

export type ProposalType = 'majorityVoting' | 'approvalThreshold' | undefined;

export type ProposalResult<TType extends ProposalType> = TType extends 'majorityVoting'
    ? IMajorityVotingResult
    : TType extends 'approvalThreshold'
      ? IApprovalThresholdResult
      : undefined;

export type IProposalDataListItemStructureBaseProps<TType extends ProposalType = ProposalType> = IDataListItemProps &
    IWeb3ComponentProps & {
        /**
         * Proposal id
         */
        id?: string;
        /**
         *  Date relative to the proposal status in ISO format or as a timestamp
         */
        date?: string | number;
        /**
         * Optional tag indicating proposal type
         */
        tag?: string;
        /**
         * Publisher(s) address (and optional ENS name and profile link)
         */
        publisher: IPublisher | IPublisher[];
        /**
         * Result of the proposal shown only when it is active, challenged or vetoed.
         */
        result?: ProposalResult<TType>;
        /**
         * Proposal status
         */
        status: ProposalStatus;
        /**
         * Proposal status detail to accompany the tag for extra context
         */
        statusContext?: string;
        /**
         * Proposal description
         */
        summary: string;
        /**
         * Proposal title
         */
        title: string;
        /**
         * Type of the ProposalDataListItem
         */
        type?: TType;
        /**
         * Indicates whether the connected wallet has voted
         */
        voted?: boolean;
    };

export interface IPublisher extends ICompositeAddress {
    /**
     * Link to additional information about the publisher, such as a profile page or block explorer.
     */
    link?: string;
}

export interface IProposalStage {
    /**
     * Name of the proposal stage
     */
    title?: string;
    /**
     * Id of the proposal stage
     */
    id: string | number;
}

export interface IProposalResultBase {
    /**
     * Proposal stage
     */
    stage?: IProposalStage;
}

export interface IApprovalThresholdResult extends IProposalResultBase {
    /**
     * Number of approvals for the proposal
     */
    approvalAmount: number;
    /**
     * Proposal approval threshold
     */
    approvalThreshold: number;
}

export interface IMajorityVotingResult extends IProposalResultBase {
    /**
     * Winning option
     */
    option: string;
    /**
     * Number of votes for the winning option
     */
    voteAmount: string;
    /**
     * Percentage of votes for the winning option
     */
    votePercentage: number;
}

export type IProposalDataListItemStructureProps =
    | IProposalDataListItemStructureBaseProps<undefined>
    | IProposalDataListItemStructureBaseProps<'majorityVoting'>
    | IProposalDataListItemStructureBaseProps<'approvalThreshold'>;
