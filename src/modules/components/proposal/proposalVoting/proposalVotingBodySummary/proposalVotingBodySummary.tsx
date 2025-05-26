import classNames from 'classnames';
import type { ComponentProps, PropsWithChildren } from 'react';
import { useProposalVotingContext } from '../proposalVotingContext';

export interface IProposalVotingBodySummaryProps extends ComponentProps<'div'> {}

export const ProposalVotingBodySummary: React.FC<PropsWithChildren<IProposalVotingBodySummaryProps>> = (props) => {
    const { children, className, ...otherProps } = props;

    const { activeBody } = useProposalVotingContext();

    if (activeBody != null) {
        return null;
    }

    return (
        <div className={classNames('flex w-full flex-col gap-3', className)} {...otherProps}>
            {children}
        </div>
    );
};
