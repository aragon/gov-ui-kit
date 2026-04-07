import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useDataListContext } from '../dataListContext';
import { DataListItem } from '../dataListItem';
import { DataListRoot, type IDataListRootProps } from './dataListRoot';

describe('<DataList.Root /> component', () => {
    const createTestProps = (props?: Partial<IDataListRootProps>): IDataListRootProps => ({
        entityLabel: 'test',
        ...props,
    });

    const createTestComponent = (props?: Partial<IDataListRootProps>) => {
        const completeProps = createTestProps(props);

        return <DataListRoot {...completeProps} />;
    };

    it('renders the data list items', () => {
        const children = [<DataListItem href="www.aragon.org" key="1" />];
        render(createTestComponent({ children }));
        expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('provides a function that increases the internal current page and triggers the onLoadMore callback', async () => {
        const user = userEvent.setup();
        const onLoadMore = jest.fn();
        const ChildrenComponent = () => {
            const { currentPage, handleLoadMore } = useDataListContext();

            return (
                <button onClick={() => handleLoadMore(currentPage + 1)} type="button">
                    {currentPage}
                </button>
            );
        };

        render(
            <DataListRoot {...createTestProps({ onLoadMore })}>
                <ChildrenComponent />
            </DataListRoot>,
        );

        await user.click(screen.getByRole('button'));
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(onLoadMore).toHaveBeenCalled();
    });
});
