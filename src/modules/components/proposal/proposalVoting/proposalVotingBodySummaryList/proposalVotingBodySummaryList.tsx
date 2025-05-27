import classNames from 'classnames';
import type { ComponentProps } from 'react';

export interface IProposalVotingBodySummaryListProps extends ComponentProps<'div'> {}

export const ProposalVotingBodySummaryList: React.FC<IProposalVotingBodySummaryListProps> = (props) => {
    const { children, className, ...otherProps } = props;

    return (
        <div className={classNames('flex w-full flex-col gap-3', className)} {...otherProps}>
            {children}
        </div>
    );
};
