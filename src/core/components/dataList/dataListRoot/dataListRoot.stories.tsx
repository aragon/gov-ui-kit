import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Avatar } from '../../avatars';
import { IconType } from '../../icon';
import { DataListItem } from '../dataListItem';
import { DataList, type IDataListContainerProps, type IDataListRootProps } from '../index';
import type { DataListState } from './dataListRoot';

const meta: Meta<typeof DataList.Root> = {
    title: 'Core/Components/DataList/DataList.Root',
    component: DataList.Root,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
        },
    },
};

type Story = StoryObj<typeof DataList.Root>;

const ListItemComponent = (props: { id: number }) => (
    <DataListItem className="flex flex-row gap-2 py-4 md:py-6" href="https://aragon.org" target="_blank">
        <Avatar />
        <p className="grow text-base font-normal leading-normal text-neutral-800">#{props.id}</p>
        <p className="text-sm font-normal leading-normal text-neutral-500">Some info</p>
    </DataListItem>
);

const ListItemComponentLoading = () => (
    <DataListItem className="flex animate-pulse flex-row items-center gap-2 py-4 md:py-6">
        <div className="size-6 rounded-full bg-neutral-50" />
        <div className="flex grow flex-col gap-2">
            <div className="h-2 grow rounded bg-neutral-50" />
            <div className="h-2 w-1/3 rounded bg-neutral-50" />
        </div>
    </DataListItem>
);

interface IStaticListComponentProps extends IDataListRootProps, Pick<IDataListContainerProps, 'layoutClassName'> {}

const StaticListComponent = (props: IStaticListComponentProps) => {
    const { itemsCount = 20, layoutClassName, ...otherProps } = props;

    const [searchValue, setSearchValue] = useState<string>();
    const [activeSort, setActiveSort] = useState('id_asc');

    const sortItems = useMemo(
        () => [
            { value: 'id_asc', label: 'ID increased', type: 'ASC' as const },
            { value: 'id_desc', label: 'ID decreased', type: 'DESC' as const },
        ],
        [],
    );

    const shouldFilter = searchValue != null && searchValue.trim().length > 0;
    const userIds = useMemo(
        () => [...Array<number>(itemsCount)].map(() => Math.floor(Math.random() * 100_000)),
        [itemsCount],
    );

    const filteredUsers = useMemo(() => {
        const newFilteredUsers = shouldFilter ? userIds.filter((id) => id.toString().includes(searchValue)) : userIds;

        return newFilteredUsers.toSorted((a, b) => (activeSort === 'id_asc' ? a - b : b - a));
    }, [userIds, searchValue, activeSort, shouldFilter]);

    const entityLabel = filteredUsers.length === 1 ? 'User' : 'Users';
    const state = shouldFilter ? 'filtered' : 'idle';

    const emptyFilteredState = {
        heading: 'No users found',
        description: 'Your applied filters are not matching with any results. Reset and search with other filters!',
        secondaryButton: {
            label: 'Reset all filters',
            iconLeft: IconType.RELOAD,
            onClick: () => setSearchValue(undefined),
        },
    };

    return (
        <DataList.Root itemsCount={filteredUsers.length} state={state} {...otherProps} entityLabel={entityLabel}>
            <DataList.Filter
                onFilterClick={() => alert('filter click')}
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
                placeholder="Filter by user id"
                activeSort={activeSort}
                onSortChange={setActiveSort}
                sortItems={sortItems}
                onResetFiltersClick={() => setSearchValue(undefined)}
            />
            <DataList.Container emptyFilteredState={emptyFilteredState} layoutClassName={layoutClassName}>
                {filteredUsers.map((id) => (
                    <ListItemComponent key={id} id={id} />
                ))}
            </DataList.Container>
            <DataList.Pagination />
        </DataList.Root>
    );
};

/**
 * Usage of the DataList.Root component with a static list of items.
 */
export const StaticList: Story = {
    args: {
        pageSize: 4,
        itemsCount: 21,
    },
    render: (props) => <StaticListComponent {...props} />,
};

/**
 * Usage of the DataList.Root component with a custom layout for the DataList.Item components
 */
export const CustomLayout: Story = {
    args: {
        pageSize: 9,
        itemsCount: 21,
    },
    render: (props) => <StaticListComponent layoutClassName="grid grid-cols-1 lg:grid-cols-3" {...props} />,
};

const getUsers = (dbUsers: number[] = [], search = '', page = 0, sort = 'id_asc', pageSize = 6) => {
    const sortUsers = (users: number[] = [], sort?: string) =>
        users.toSorted((a, b) => (sort === 'id_asc' ? a - b : b - a));

    const paginateUsers = (users: number[] = [], page = 0, pageSize = 6) =>
        users.slice(0, Math.min(dbUsers.length, (page + 1) * pageSize));

    const filterUsers = (users: number[] = [], value?: string) =>
        value != null && value.trim().length > 0 ? users.filter((id) => id.toString().includes(value)) : users;

    const filteredUsers = filterUsers(dbUsers, search);
    const sortedUsers = sortUsers(filteredUsers, sort);
    const paginatedUsers = paginateUsers(sortedUsers, page, pageSize);

    return { total: filteredUsers.length, items: paginatedUsers };
};

const AsyncListComponent = (props: IDataListRootProps) => {
    const { itemsCount = 20, pageSize, ...otherProps } = props;

    const [dataListState, setDataListState] = useState<DataListState>();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchValue, setSearchValue] = useState<string>();
    const [activeSort, setActiveSort] = useState('id_asc');
    const [users, setUsers] = useState({ total: 0, items: [] as number[] });

    const requestTimeout = useRef<NodeJS.Timeout>();
    const dbUsers = useRef<number[]>();

    const sortItems = useMemo(
        () => [
            { value: 'id_asc', label: 'ID increased', type: 'ASC' as const },
            { value: 'id_desc', label: 'ID decreased', type: 'DESC' as const },
        ],
        [],
    );

    const handleLoadMore = () => {
        setDataListState('fetchingNextPage');
        setCurrentPage((current) => current + 1);
    };

    const handleSearchValueChange = (value?: string) => {
        setSearchValue(value);
        setCurrentPage(0);
    };

    // Generate and initialise users list on itemsCount change
    useEffect(() => {
        setDataListState('initialLoading');

        setTimeout(() => {
            dbUsers.current = [...Array<number>(itemsCount)].map(() => Math.floor(Math.random() * 100_000));
            setUsers(getUsers(dbUsers.current));
            setDataListState('idle');
        }, 1_000);
    }, [itemsCount]);

    // Sort and filter user list on filter change
    useEffect(() => {
        // Do not run the filtering & sorting if list is not initialised yet
        if (!dbUsers.current) {
            return;
        }

        setDataListState((state) => (state !== 'fetchingNextPage' ? 'loading' : state));

        requestTimeout.current = setTimeout(() => {
            setUsers(getUsers(dbUsers.current, searchValue, currentPage, activeSort, pageSize));
            const isFiltered = searchValue != null && searchValue.trim().length > 0;
            const newState = isFiltered ? 'filtered' : 'idle';
            setDataListState(newState);
        }, 1_000);

        return () => {
            clearTimeout(requestTimeout.current);
        };
    }, [searchValue, currentPage, activeSort, pageSize]);

    const emptyFilteredState = {
        heading: 'No users found',
        description: 'Your applied filters are not matching with any results. Reset and search with other filters!',
        secondaryButton: {
            label: 'Reset all filters',
            iconLeft: IconType.RELOAD,
            onClick: () => handleSearchValueChange(),
        },
    };

    const emptyState = {
        heading: 'No users found',
        description: 'Set the itemCount property to be greater than 0 to generate and display the users list',
        primaryButton: {
            label: 'Create user',
            iconLeft: IconType.PLUS,
            onClick: () => alert('create user'),
        },
    };

    const errorState = {
        heading: 'Error loading users',
        description: 'There was an error loading the users. Try again!',
        secondaryButton: {
            label: 'Reload users',
            iconLeft: IconType.RELOAD,
            onClick: () => alert('reload!'),
        },
    };

    const entityLabel = users.total === 1 ? 'User' : 'Users';

    return (
        <DataList.Root
            itemsCount={users.total}
            pageSize={pageSize}
            state={dataListState}
            onLoadMore={handleLoadMore}
            {...otherProps}
            entityLabel={entityLabel}
        >
            <DataList.Filter
                onFilterClick={() => alert('filter click')}
                searchValue={searchValue}
                onSearchValueChange={handleSearchValueChange}
                placeholder="Filter by user id"
                activeSort={activeSort}
                onSortChange={setActiveSort}
                sortItems={sortItems}
                onResetFiltersClick={() => setSearchValue(undefined)}
            />
            <DataList.Container
                SkeletonElement={ListItemComponentLoading}
                errorState={errorState}
                emptyState={emptyState}
                emptyFilteredState={emptyFilteredState}
            >
                {users.items.map((id) => (
                    <ListItemComponent key={id} id={id} />
                ))}
            </DataList.Container>
            <DataList.Pagination />
        </DataList.Root>
    );
};

/**
 * Usage of the DataList.Root component with an async loaded list.
 */
export const AsyncList: Story = {
    args: {
        pageSize: 6,
        itemsCount: 122,
    },
    render: ({ onLoadMore, ...props }) => <AsyncListComponent {...props} />,
};

export default meta;
