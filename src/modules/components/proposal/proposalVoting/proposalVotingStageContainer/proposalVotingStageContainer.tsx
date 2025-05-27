import { Children, cloneElement, isValidElement, type ComponentProps } from 'react';
import { Accordion } from '../../../../../core';
import { type IProposalVotingStageProps } from '../proposalVotingStage';

export interface IProposalVotingStageContainerProps extends Omit<ComponentProps<'div'>, 'defaultValue'> {
    /**
     * Active stage that will be expanded for multi-stage proposals.
     */
    activeStage?: string;
    /**
     * Callback called when the user selects a stage, to be used for expanding the current active stage for multi-stage proposals.
     */
    onStageClick?: (stage?: string) => void;
}

export const ProposalVotingStageContainer: React.FC<IProposalVotingStageContainerProps> = (props) => {
    const { children, activeStage, onStageClick, ...otherProps } = props;

    const processedChildren = Children.toArray(children);

    return (
        <Accordion.Container isMulti={false} value={activeStage} onValueChange={onStageClick} {...otherProps}>
            {processedChildren.map((child, index) =>
                isValidElement<IProposalVotingStageProps>(child)
                    ? cloneElement(child, { ...child.props, index })
                    : child,
            )}
        </Accordion.Container>
    );
};
