import type { IDataListItemProps } from '../../../../../core';
import { type ICompositeAddress, type IWeb3ComponentProps } from '../../../../types';
import { type ProposalStatus } from '../../proposalUtils';

export type IProposalDataListItemStructureProps = IDataListItemProps &
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
         * Proposal status
         */
        status: ProposalStatus;
        /**
         * Proposal context for where it is in the voting process to accompany the status
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
