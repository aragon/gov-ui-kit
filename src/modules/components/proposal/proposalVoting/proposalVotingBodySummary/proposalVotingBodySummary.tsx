import classNames from 'classnames';
import type { ComponentProps, PropsWithChildren } from 'react';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export interface IProposalVotingBodySummaryProps extends ComponentProps<'div'> {}

export const ProposalVotingBodySummary: React.FC<PropsWithChildren<IProposalVotingBodySummaryProps>> = (props) => {
    const { children, className, ...otherProps } = props;

    const { activeBody } = useProposalVotingStageContext();

    if (activeBody) {
        return null;
    }

    return (
        <div className={classNames('flex w-full flex-col gap-3', className)} {...otherProps}>
            {children}
        </div>
    );
};
