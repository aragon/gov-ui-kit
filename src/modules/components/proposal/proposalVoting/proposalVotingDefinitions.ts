export enum ProposalVotingTab {
    BREAKDOWN = 'BREAKDOWN',
    VOTES = 'VOTES',
    DETAILS = 'DETAILS',
}

export interface IBrandedIdentity {
    /**
     * Logo src of the branded identity.
     */
    logo: string;
    /**
     * Label of the branded identity. e.g. "Safe{Wallet}""
     */
    label: string;
}
