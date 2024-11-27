import type { ComponentProps, PropsWithChildren } from 'react';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export interface IProposalVotingBodySummaryProps extends ComponentProps<'div'> {}

export const ProposalVotingBodySummary: React.FC<PropsWithChildren<IProposalVotingBodySummaryProps>> = (props) => {
    const { children, ...otherProps } = props;

    const { activeBody } = useProposalVotingStageContext();

    if (activeBody) {
        return null;
    }

    return (
        <div {...otherProps} className="flex w-full flex-col gap-3">
            {children}
        </div>
    );
};
