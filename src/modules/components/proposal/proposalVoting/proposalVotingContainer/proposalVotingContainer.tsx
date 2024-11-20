import { Children, cloneElement, isValidElement, type ComponentProps, type ReactElement } from 'react';

interface ChildProps {
    /**
     * Index of the child in the parent.
     */
    index: number;
    /**
     * Active stage that will be expanded for multi-stage proposals.
     */
    activeStage?: string;
    /**
     * Callback called when the user selects a stage, to be used for expanding the current active stage for multi-stage proposals.
     */
    onStageClick?: (stage?: string) => void;
    /**
     * Flag that indicates if the proposal is multi stage.
     */
    isMultiStage: boolean;
}

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

    const processedChildren = Children.toArray(children) as Array<ReactElement<ChildProps>>;
    const isMultiStage = processedChildren.length > 1;

    return (
        <div className="flex w-full flex-col gap-y-2 md:gap-y-3" {...otherProps}>
            {isMultiStage && (
                <>
                    {processedChildren.map((child, index) =>
                        isValidElement(child)
                            ? cloneElement(child, {
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
