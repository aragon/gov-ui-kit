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
         * Provides additional context about the current status of a proposal within a multistage voting process.
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
