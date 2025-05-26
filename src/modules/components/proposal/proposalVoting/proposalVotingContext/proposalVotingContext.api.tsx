import type { ReactNode } from 'react';

export interface IProposalVotingContext {
    /**
     * List of plugin addresses to be displayed in the body summary list.
     */
    bodyList?: string[];
    /**
     * The active body to be displayed.
     */
    activeBody?: string;
    /**
     * Callback triggered to update the current active body.
     */
    setActiveBody?: (id?: string) => void;
}

export interface IProposalVotingContextProviderProps extends Pick<IProposalVotingContext, 'bodyList'> {
    /**
     * Children of the component.
     */
    children?: ReactNode;
}
