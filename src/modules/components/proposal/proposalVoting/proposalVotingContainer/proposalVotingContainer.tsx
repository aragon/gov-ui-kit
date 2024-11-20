import classNames from 'classnames';
import React, { Children, type ComponentProps } from 'react';
import { Accordion, Card, Heading } from '../../../../../core';
import { type IProposalVotingStageProps } from '../proposalVotingStage';

export interface IProposalVotingContainerProps extends ComponentProps<'div'> {
    /**
     * Title displayed on top.
     */
    title: string;
    /**
     * Description of the proposal voting.
     */
    description: string;
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
    const { title, description, className, children, activeStage, onStageClick, ...otherProps } = props;

    const processedChildren = Children.toArray(children);
    const isMultiStage = processedChildren.length > 1;

    return (
        <Card className={classNames('flex flex-col overflow-hidden', className)} {...otherProps}>
            <div className={classNames('flex flex-col gap-2 p-4 md:gap-3 md:p-6', { 'pb-2 md:pb-3': !isMultiStage })}>
                <Heading size="h2">{title}</Heading>
                <p className="text-base font-normal leading-normal text-neutral-500">{description}</p>
            </div>
            {isMultiStage && (
                <Accordion.Container isMulti={false} value={activeStage} onValueChange={onStageClick}>
                    {processedChildren.map((child, index) =>
                        React.isValidElement<IProposalVotingStageProps>(child)
                            ? React.cloneElement(child, { ...child.props, index, isMultiStage })
                            : child,
                    )}
                </Accordion.Container>
            )}
            {!isMultiStage && <div className="px-4 pb-6 pt-1 md:px-6">{children}</div>}
        </Card>
    );
};
