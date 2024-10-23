import classNames from 'classnames';
import { useState, type ChangeEvent, type ComponentProps } from 'react';
import { AvatarIcon } from '../../avatars';
import { Button } from '../../button';
import { useGukCoreContext } from '../../gukCoreProvider';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';
import { useDataListContext } from '../dataListContext';
import { DataListFilterSort } from './dataListFilterSort';
import { DataListFilterStatus } from './dataListFilterStatus';

export interface IDataListFilterSortItem {
    /**
     * Value of the sort item.
     */
    value: string;
    /**
     * Label of the sort item.
     */
    label: string;
    /**
     * Sort item type to display the correct icon on the sort button.
     */
    type: 'ASC' | 'DESC';
}

export interface IDataListFilterProps extends Omit<ComponentProps<'div'>, 'onChange'> {
    /**
     * Placeholder of the search bar.
     */
    placeholder?: string;
    /**
     * Current value of the search bar.
     */
    searchValue?: string;
    /**
     * Callback called on search value change.
     */
    onSearchValueChange: (value?: string) => void;
    /**
     * Active sorting of the data list.
     */
    activeSort?: string;
    /**
     * Sort items displayed on the sort dropdown.
     */
    sortItems?: IDataListFilterSortItem[];
    /**
     * Callback called on sort change.
     */
    onSortChange?: (sort: string) => void;
    /**
     * Callback called on filter button click. The filter button is not displayed when the callback is not defined.
     */
    onFilterClick?: () => void;
    /**
     * Callback called on reset filters button click. The reset filters button is not displayed when the callback is not defined.
     */
    onResetFiltersClick?: () => void;
}

export const DataListFilter: React.FC<IDataListFilterProps> = (props) => {
    const {
        onFilterClick,
        searchValue = '',
        onSearchValueChange,
        placeholder,
        className,
        activeSort,
        sortItems,
        onSortChange,
        onResetFiltersClick,
        ...otherProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const { state } = useDataListContext();

    const { copy } = useGukCoreContext();

    const handleInputFocus = () => setIsFocused(true);
    const handleInputBlur = () => setIsFocused(false);

    const handleClear = () => onSearchValueChange(undefined);

    const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => onSearchValueChange(event.target.value);

    const displayClearIcon = searchValue.length > 0;

    return (
        <div className={classNames('flex flex-col gap-2 md:gap-3', className)} {...otherProps}>
            <div
                className={classNames(
                    'flex flex-row items-center rounded-xl border p-3 pr-2 transition-all md:pl-4 md:pr-3',
                    'border-neutral-100 bg-neutral-0 text-neutral-500 shadow-neutral-sm',
                    'text-base font-normal leading-tight',
                    'hover:border-neutral-300 hover:shadow-neutral',
                    'focus-within:border-primary-400 focus-within:shadow-primary',
                    'focus-within:hover:border-primary-400 focus-within:hover:shadow-primary',
                )}
            >
                {state !== 'loading' && (
                    <AvatarIcon icon={IconType.SEARCH} size="md" variant={isFocused ? 'primary' : 'neutral'} />
                )}
                {state === 'loading' && <Spinner size="lg" variant="primary" className="m-1" />}
                <input
                    type="search"
                    className={classNames(
                        'size-full truncate bg-transparent pl-3 caret-neutral-500 outline-none search-cancel:appearance-none',
                        'placeholder:text-base placeholder:font-normal placeholder:leading-tight placeholder:text-neutral-300',
                    )}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleSearchValueChange}
                    placeholder={placeholder}
                    value={searchValue}
                />
                {displayClearIcon && (
                    <button className="mr-2 p-2.5 md:mr-4" onClick={handleClear}>
                        <Icon icon={IconType.CLOSE} size="sm" className="text-neutral-300" />
                    </button>
                )}
                <div className="flex flex-row gap-2 md:gap-3">
                    {onFilterClick && (
                        <>
                            <Button
                                iconLeft={IconType.FILTER}
                                variant="tertiary"
                                size="md"
                                onClick={onFilterClick}
                                className="hidden md:flex"
                            >
                                {copy.dataListFilter.filter}
                            </Button>
                            <Button
                                iconLeft={IconType.FILTER}
                                variant="tertiary"
                                size="md"
                                onClick={onFilterClick}
                                className="md:hidden"
                            />
                        </>
                    )}
                    <DataListFilterSort
                        activeSort={activeSort}
                        sortItems={sortItems}
                        onSortChange={onSortChange}
                        triggerClassNames="hidden md:flex"
                        triggerLabel={copy.dataListFilter.sort}
                    />
                    <DataListFilterSort
                        activeSort={activeSort}
                        sortItems={sortItems}
                        onSortChange={onSortChange}
                        triggerClassNames="md:hidden"
                    />
                </div>
            </div>
            <DataListFilterStatus onResetFiltersClick={onResetFiltersClick} />
        </div>
    );
};
