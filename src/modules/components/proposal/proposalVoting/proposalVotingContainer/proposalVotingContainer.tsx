import { Children, cloneElement, isValidElement, type ComponentProps } from 'react';
import { Accordion } from '../../../../../core';
import { type IProposalVotingStageProps } from '../proposalVotingStage';

export interface IProposalVotingContainerProps extends Omit<ComponentProps<'div'>, 'defaultValue'> {
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
    const { children, activeStage, onStageClick, ...otherProps } = props;

    const processedChildren = Children.toArray(children);
    const isMultiStage = processedChildren.length > 1;

    return (
        <Accordion.Container isMulti={false} value={activeStage} onValueChange={onStageClick} {...otherProps}>
            {isMultiStage && (
                <>
                    {processedChildren.map((child, index) =>
                        isValidElement<IProposalVotingStageProps>(child)
                            ? cloneElement(child, { ...child.props, index, isMultiStage })
                            : child,
                    )}
                </>
            )}
            {!isMultiStage && children}
        </Accordion.Container>
    );
};
