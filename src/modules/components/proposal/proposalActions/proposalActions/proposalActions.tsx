import classNames from 'classnames';
import { useState, type ReactNode } from 'react';
import { Accordion, Button, Card, Heading } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalActionsAction } from '../proposalActionsAction';
import type { IProposalAction, ProposalActionComponent } from '../proposalActionsTypes';

export interface IProposalActionsProps extends IWeb3ComponentProps {
    /**
     * Actions to render.
     */
    actions: IProposalAction[];
    /**
     * Map of action-type <=> action-name displayed on the action header.
     */
    actionNames?: Record<string, string>;
    /**
     * Map of action-type <=> custom-component to customise how actions are displayed.
     */
    customActionComponents?: Record<string, ProposalActionComponent>;
    /**
     * Additional classes for the component.
     */
    className?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
}

export const ProposalActions: React.FC<IProposalActionsProps> = (props) => {
    const { actions, actionNames, className, customActionComponents, children, ...web3Props } = props;

    const { copy } = useOdsModulesContext();

    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const handleToggleAll = () => {
        if (expandedItems.length === actions.length) {
            setExpandedItems([]);
        } else {
            setExpandedItems(Array.from({ length: actions.length }, (_, index) => `${index}`));
        }
    };

    const handleAccordionValueChange = (value: string[] = []) => setExpandedItems(value);

    return (
        <Card className={classNames('w-full overflow-hidden', className)}>
            <Heading size="h2" className="px-4 pt-4 md:px-6 md:pt-6">
                {copy.proposalActionsContainer.containerName}
            </Heading>
            <Accordion.Container isMulti={true} value={expandedItems} onValueChange={handleAccordionValueChange}>
                {actions.map((action, index) => (
                    <ProposalActionsAction
                        key={`action-${index}`}
                        action={action}
                        index={index}
                        name={actionNames?.[action.type]}
                        customComponent={customActionComponents?.[action.type]}
                        {...web3Props}
                    />
                ))}
                <div className="mt-1 flex w-full flex-col gap-y-3 px-4 pb-4 md:flex-row-reverse md:px-6 md:pb-6">
                    {actions.length > 1 && (
                        <Button onClick={handleToggleAll} variant="tertiary" size="md" className="shrink-0 md:w-fit">
                            {expandedItems.length === actions.length
                                ? copy.proposalActionsContainer.collapse
                                : copy.proposalActionsContainer.expand}
                        </Button>
                    )}
                    {children}
                </div>
            </Accordion.Container>
        </Card>
    );
};
