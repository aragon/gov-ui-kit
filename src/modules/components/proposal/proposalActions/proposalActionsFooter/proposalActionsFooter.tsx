import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { Button, Dropdown, IconType } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { useProposalActionsContext } from '../proposalActionsContext';

export interface IProposalActionsFooterDropdownItem {
    /**
     * Label for the dropdown item.
     */
    label: string;
    /**
     * Icon to display next to the label.
     */
    icon?: IconType;
    /**
     * Position of the icon relative to the label.
     */
    iconPosition?: 'left' | 'right';
    /**
     * Callback function to be executed when the dropdown item is clicked.
     */
    onClick: () => void;
}

export interface IProposalActionsFooterProps extends ComponentProps<'div'> {
    /**
     * List of action IDs to be used to toggle the expanded state for all the actions, defaults to the index of the actions.
     */
    actionIds?: string[];
    /**
     * Optional dropdown items to display in a dropdown menu alongside the expand/collapse action.
     * When provided, the expand/collapse button is replaced with a dropdown containing both
     * the expand/collapse action and the provided items.
     */
    dropdownItems?: IProposalActionsFooterDropdownItem[];
}

export const ProposalActionsFooter: React.FC<IProposalActionsFooterProps> = (props) => {
    const { actionIds, dropdownItems, className, children, ...otherProps } = props;

    const { actionsCount, setExpandedActions, expandedActions, isLoading } = useProposalActionsContext();
    const { copy } = useGukModulesContext();

    const handleToggleAll = () => {
        if (expandedActions.length === actionsCount) {
            setExpandedActions([]);
        } else {
            const actions = actionIds ?? Array.from({ length: actionsCount }, (_, index) => index.toString());
            setExpandedActions(actions);
        }
    };

    if (actionsCount === 0 && children == null) {
        return null;
    }

    const showExpandCollapse = actionsCount > 1;
    const hasDropdownItems = dropdownItems != null && dropdownItems.length > 0;
    const showDropdown = showExpandCollapse && hasDropdownItems;

    // Build all dropdown items including expand/collapse
    const allDropdownItems: IProposalActionsFooterDropdownItem[] = [];

    if (showExpandCollapse) {
        allDropdownItems.push({
            label:
                expandedActions.length === actionsCount
                    ? copy.proposalActionsFooter.collapse
                    : copy.proposalActionsFooter.expand,
            onClick: handleToggleAll,
        });
    }

    if (hasDropdownItems) {
        allDropdownItems.push(...dropdownItems);
    }

    return (
        <div
            className={classNames(
                'flex w-full flex-col-reverse justify-between gap-3 pt-3 md:flex-row md:items-center md:pt-4',
                className,
            )}
            {...otherProps}
        >
            {children}

            {/* Show dropdown if we have items, otherwise show button */}
            {showDropdown ? (
                <Dropdown.Container
                    constrainContentWidth={false}
                    size="md"
                    className="shrink-0 md:ml-auto"
                    disabled={isLoading}
                    customTrigger={
                        <Button variant="tertiary" size="md" iconRight={IconType.DOTS_VERTICAL} disabled={isLoading}>
                            {copy.proposalActionsFooter.more}
                        </Button>
                    }
                >
                    {allDropdownItems.map((item, index) => (
                        <Dropdown.Item
                            key={`${item.label}-${String(index)}`}
                            icon={item.icon}
                            iconPosition={item.iconPosition ?? 'left'}
                            onClick={() => item.onClick()}
                        >
                            {item.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Container>
            ) : showExpandCollapse ? (
                <Button
                    onClick={handleToggleAll}
                    variant="tertiary"
                    size="md"
                    className="shrink-0 md:ml-auto"
                    disabled={isLoading}
                >
                    {expandedActions.length === actionsCount
                        ? copy.proposalActionsFooter.collapse
                        : copy.proposalActionsFooter.expand}
                </Button>
            ) : null}
        </div>
    );
};
