import { render, screen } from '@testing-library/react';
import { DataListContextProvider, type IDataListContext } from '../dataListContext';
import { dataListTestUtils } from '../dataListTestUtils';
import { DataListItem, type IDataListItemProps } from './dataListItem';

describe('<DataList.Item /> component', () => {
    const createTestComponent = (values?: {
        props?: Partial<IDataListItemProps>;
        context?: Partial<IDataListContext> | null;
    }) => {
        const completeProps = {
            ...values?.props,
        };

        if (values?.context === null) {
            return <DataListItem {...completeProps} />;
        }

        return (
            <DataListContextProvider value={dataListTestUtils.generateContextValues(values?.context)}>
                <DataListItem {...completeProps} />
            </DataListContextProvider>
        );
    };

    it('renders an interactive link with the given content when href property is set', () => {
        const props = { children: 'test-data-list-item', href: '/test' };
        render(createTestComponent({ props }));
        const link = screen.getByRole('link', { name: props.children });
        expect(link).toBeInTheDocument();
        expect(link.classList).toContain('cursor-pointer');
    });

    it('marks the item as hidden when the data list is on initialLoading state', () => {
        const context = { state: 'initialLoading' as const };
        const props = { href: '/test' };
        render(createTestComponent({ context, props }));
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('marks the item as hidden when the data list is on loading state with no elements being currently rendered', () => {
        const context = { state: 'loading' as const, childrenItemCount: 0 };
        const props = { href: '/test' };
        render(createTestComponent({ context, props }));
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('does not throw error when not placed inside the DataListContextProvider', () => {
        const context = null;
        expect(() => render(createTestComponent({ context }))).not.toThrow();
    });

    it('renders the item as an interactive button when onClick property is set', () => {
        const props = { onClick: jest.fn() };
        render(createTestComponent({ props }));
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.classList).toContain('cursor-pointer');
    });

    it('renders the item as a non interactive button when both onClick and href property are not set', () => {
        const props = { onClick: undefined, href: undefined };
        render(createTestComponent({ props }));
        expect(screen.getByRole('button').classList).not.toContain('cursor-pointer');
    });
});
