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

    it('renders the item as a non interactive div when both onClick and href property are not set', () => {
        const props = { children: 'test-data-list-item', onClick: undefined, href: undefined };
        render(createTestComponent({ props }));
        const button = screen.queryByRole('button', { name: props.children });
        const link = screen.queryByRole('link', { name: props.children });
        const text = screen.getByText(props.children);
        expect(button).not.toBeInTheDocument();
        expect(link).not.toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it('renders the item as an interactive button when onClick property is set', () => {
        const props = { children: 'test-data-list-item', onClick: jest.fn() };
        render(createTestComponent({ props }));
        const button = screen.getByRole('button', { name: props.children });
        expect(button).toBeInTheDocument();
        expect(button.classList).toContain('cursor-pointer');
    });
});
