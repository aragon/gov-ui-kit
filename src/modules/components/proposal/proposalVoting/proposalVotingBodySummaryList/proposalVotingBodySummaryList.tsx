import classNames from 'classnames';
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';

export interface IProposalVotingBodySummaryListProps extends ComponentProps<'div'> {
    /**
     * Children to render.
     */
    children: ReactNode;
}

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
