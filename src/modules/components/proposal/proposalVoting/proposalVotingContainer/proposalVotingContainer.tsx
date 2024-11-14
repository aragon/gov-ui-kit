import React, { Children, type ComponentProps } from 'react';

export interface IProposalVotingContainerProps extends ComponentProps<'div'> {}

export const ProposalVotingContainer: React.FC<IProposalVotingContainerProps> = (props) => {
    const { className, children, ...otherProps } = props;

    const processedChildren = Children.toArray(children);
    const isMultiStage = processedChildren.length > 1;

    return (
        <div className="flex w-full flex-col gap-y-2 transition-colors md:gap-y-3">
            {isMultiStage && (
                <>
                    {processedChildren.map((child, index) =>
                        React.isValidElement(child)
                            ? React.cloneElement(child, { ...child.props, index, isMultiStage })
                            : child,
                    )}
                </>
            )}
            {!isMultiStage && children}
        </div>
    );
};
