import { Button } from '../../button';
import { Dropdown } from '../../dropdown';
import { IconType } from '../../icon';
import type { IDataListFilterProps } from './dataListFilter';

export interface IDataListFilterSortProps
    extends Pick<IDataListFilterProps, 'activeSort' | 'sortItems' | 'onSortChange'> {
    /**
     * Classes for the dropdown trigger.
     */
    triggerClassNames?: string;
    /**
     * Label of the dropdown trigger.
     */
    triggerLabel?: string;
}

export const DataListFilterSort: React.FC<IDataListFilterSortProps> = (props) => {
    const { activeSort, sortItems, onSortChange, triggerClassNames, triggerLabel } = props;

    if (sortItems == null || sortItems.length === 0) {
        return null;
    }

    const sortType = sortItems.find((item) => item.value === activeSort)?.type;
    const sortIcon = sortType === 'ASC' ? IconType.SORT_ASC : IconType.SORT_DESC;

    return (
        <Dropdown.Container
            align="end"
            customTrigger={
                <Button iconLeft={sortIcon} variant="tertiary" size="md" className={triggerClassNames}>
                    {triggerLabel && <span className="hidden md:inline-block">{triggerLabel}</span>}
                </Button>
            }
        >
            {sortItems.map(({ value, label }) => (
                <Dropdown.Item key={value} selected={value === activeSort} onSelect={() => onSortChange?.(value)}>
                    {label}
                </Dropdown.Item>
            ))}
        </Dropdown.Container>
    );
};
