import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import { Button, Dropdown, IconType } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { useTransactionDetailContext } from '../transactionDetailContext';

export interface ITransactionDetailFooterDropdownItem {
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
     * Callback executed when the dropdown item is clicked.
     */
    onClick: () => void;
}

export interface ITransactionDetailFooterProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Action-row values used to expand all rows. Defaults to the row indices, matching the values assigned by
     * `TransactionDetail.Container`.
     */
    actionIds?: string[];
    /**
     * Extra dropdown items rendered in the `More` menu alongside the built-in expand/collapse-all entry, e.g. a
     * "Download actions as JSON" action whose handler is supplied by the consumer.
     */
    dropdownItems?: ITransactionDetailFooterDropdownItem[];
}

/**
 * The `<TransactionDetail.Footer />` component renders the `More` dropdown for the action list, offering an
 * expand/collapse-all entry and any extra items provided by the consumer (such as downloading the actions as JSON).
 */
export const TransactionDetailFooter: React.FC<ITransactionDetailFooterProps> = (props) => {
    const { actionIds, dropdownItems, className, children, ...otherProps } = props;

    const { copy } = useGukModulesContext();
    const { actionsCount, expandedActions, setExpandedActions } = useTransactionDetailContext();

    const handleToggleAll = () => {
        if (expandedActions.length === actionsCount) {
            setExpandedActions([]);
        } else {
            setExpandedActions(actionIds ?? Array.from({ length: actionsCount }, (_, index) => index.toString()));
        }
    };

    const showExpandCollapse = actionsCount > 1;
    const hasDropdownItems = dropdownItems != null && dropdownItems.length > 0;
    const showDropdown = showExpandCollapse || hasDropdownItems;

    if (!showDropdown && children == null) {
        return null;
    }

    const allDropdownItems: ITransactionDetailFooterDropdownItem[] = [];

    if (showExpandCollapse) {
        allDropdownItems.push({
            label:
                expandedActions.length === actionsCount
                    ? copy.transactionDetail.collapse
                    : copy.transactionDetail.expand,
            onClick: handleToggleAll,
        });
    }

    if (hasDropdownItems) {
        allDropdownItems.push(...dropdownItems);
    }

    return (
        <div
            className={classNames(
                'flex w-full flex-col-reverse justify-between gap-3 pb-4 md:flex-row md:items-center md:pb-6',
                className,
            )}
            {...otherProps}
        >
            {children}
            {showDropdown && (
                <Dropdown.Container
                    className="shrink-0 md:ml-auto"
                    constrainContentWidth={false}
                    customTrigger={
                        <Button iconRight={IconType.DOTS_VERTICAL} size="md" variant="tertiary">
                            {copy.transactionDetail.more}
                        </Button>
                    }
                    size="md"
                >
                    {allDropdownItems.map((item, index) => (
                        <Dropdown.Item
                            icon={item.icon}
                            iconPosition={item.iconPosition ?? 'left'}
                            key={`${item.label}-${String(index)}`}
                            onClick={() => item.onClick()}
                        >
                            {item.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Container>
            )}
        </div>
    );
};
