import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Accordion, Button, Card, EmptyState } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalActionsAction } from '../proposalActionsAction';
import type { IProposalAction } from '../proposalActionsTypes';
import type { IProposalActionsProps } from './proposalActions.api';

export const ProposalActions = <TAction extends IProposalAction = IProposalAction>(
    props: IProposalActionsProps<TAction>,
) => {
    const {
        actions,
        actionKey,
        actionNames,
        customActionComponents,
        emptyStateDescription,
        dropdownItems,
        className,
        children,
        ...web3Props
    } = props;

    const [expandedItems, setExpandedItems] = useState<string[]>(['0']);

    const { copy } = useGukModulesContext();

    const actionsContainerRef = useRef<HTMLDivElement | null>(null);

    const handleToggleAll = () => {
        if (expandedItems.length === actions.length) {
            setExpandedItems([]);
        } else {
            setExpandedItems(Array.from({ length: actions.length }, (_, index) => `${index}`));
        }

        if (actionsContainerRef.current && expandedItems.length === actions.length) {
            actionsContainerRef.current.scrollIntoView({ behavior: 'instant' });
        }
    };

    const handleAccordionValueChange = (value: string[] = []) => setExpandedItems(value);

    const footerClassNames = classNames(
        'flex w-full flex-col justify-between gap-y-3 pb-4 md:flex-row-reverse md:items-end md:pb-6',
        { hidden: actions.length === 0 && children == null },
    );

    return (
        <div className="flex w-full flex-col gap-y-2 transition-colors md:gap-y-3">
            {actions.map((action, index) => (
                <Card
                    key={actionKey != null ? (action[actionKey] as string) : `action-${index}`}
                    className={classNames('w-full overflow-hidden', className)}
                >
                    <Accordion.Container
                        ref={actionsContainerRef}
                        isMulti={true}
                        value={expandedItems}
                        onValueChange={handleAccordionValueChange}
                    >
                        <ProposalActionsAction
                            action={action}
                            index={index}
                            name={actionNames?.[action.type]}
                            CustomComponent={customActionComponents?.[action.type]}
                            dropdownItems={dropdownItems}
                            {...web3Props}
                        />
                        {actions.length === 0 && (
                            <EmptyState
                                heading={copy.proposalActionsContainer.empty.heading}
                                description={emptyStateDescription}
                                isStacked={false}
                                objectIllustration={{ object: 'SMART_CONTRACT' }}
                            />
                        )}
                    </Accordion.Container>
                </Card>
            ))}
            <div className={footerClassNames}>
                {actions.length > 1 && (
                    <Button onClick={handleToggleAll} variant="tertiary" size="md" className="shrink-0 md:w-fit">
                        {expandedItems.length === actions.length
                            ? copy.proposalActionsContainer.collapse
                            : copy.proposalActionsContainer.expand}
                    </Button>
                )}
                {children}
            </div>
        </div>
    );
};
