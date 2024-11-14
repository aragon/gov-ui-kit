import React, { Children, type ComponentProps } from 'react';

export interface IProposalVotingContainerProps extends ComponentProps<'div'> {
    /**
     * Active stage that will be expanded for multi-stage proposals.
     */
    activeStage?: string;
    /**
     * Callback called when the user selects a stage, to be used for expanding the current active stage for multi-stage proposals.
     */
    onStageClick?: (stage?: string) => void;
}

export const ProposalVotingContainer: React.FC<IProposalVotingContainerProps> = (props) => {
    const { className, children, activeStage, onStageClick, ...otherProps } = props;

    const processedChildren = Children.toArray(children);
    const isMultiStage = processedChildren.length > 1;

    return (
        <div className="flex w-full flex-col gap-y-2 transition-colors md:gap-y-3" {...otherProps}>
            {isMultiStage && (
                <>
                    {processedChildren.map((child, index) =>
                        React.isValidElement(child)
                            ? React.cloneElement(child, {
                                  ...child.props,
                                  index,
                                  activeStage,
                                  onStageClick,
                                  isMultiStage,
                              })
                            : child,
                    )}
                </>
            )}
            {!isMultiStage && children}
        </div>
    );
};
