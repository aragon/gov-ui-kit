import classNames from 'classnames';
import React, { Children, type ComponentProps } from 'react';
import { Accordion, Card } from '../../../../../core';

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
     * Active stage that will be expanded by default for multi-stage proposals.
     */
    activeStage?: string;
}

export const ProposalVotingContainer: React.FC<IProposalVotingContainerProps> = (props) => {
    const { title, description, className, children, activeStage, ...otherProps } = props;

    const processedChildren = Children.toArray(children);
    const isMultiStage = processedChildren.length > 1;

    return (
        <Card className={classNames('flex w-full flex-col overflow-hidden', className)} {...otherProps}>
            {isMultiStage && (
                <Accordion.Container isMulti={false} defaultValue={activeStage}>
                    {processedChildren.map((child, index) =>
                        React.isValidElement(child)
                            ? React.cloneElement(child, { ...child.props, index, isMultiStage })
                            : child,
                    )}
                </Accordion.Container>
            )}
            {!isMultiStage && <div className="px-4 pb-6 pt-1 md:px-6">{children}</div>}
        </Card>
    );
};
