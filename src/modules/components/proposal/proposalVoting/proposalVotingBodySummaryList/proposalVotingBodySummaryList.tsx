import classNames from 'classnames';
import type { ComponentProps, PropsWithChildren } from 'react';

export interface IProposalVotingBodySummaryListProps extends ComponentProps<'div'> {}

export const ProposalVotingBodySummaryList: React.FC<PropsWithChildren<IProposalVotingBodySummaryListProps>> = (
    props,
) => {
    const { children, ...otherProps } = props;
    const { className } = otherProps;

    return (
        <div className={classNames('flex w-full flex-col gap-3', className)} {...otherProps}>
            {children}
        </div>
    );
};
