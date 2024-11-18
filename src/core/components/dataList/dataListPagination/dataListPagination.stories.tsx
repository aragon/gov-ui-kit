import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../index';

const meta: Meta<typeof DataList.Pagination> = {
    title: 'Core/Components/DataList/DataList.Pagination',
    component: DataList.Pagination,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
        },
    },
};

type Story = StoryObj<typeof DataList.Pagination>;

/**
 * Default usage example of the DataList.Pagination component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <DataList.Root pageSize={2} itemsCount={10} entityLabel="Users">
            <DataList.Container>
                {[...Array<number>(10)].map((_value, index) => (
                    <DataList.Item key={index}>User {index}</DataList.Item>
                ))}
            </DataList.Container>
            <DataList.Pagination {...props} />
        </DataList.Root>
    ),
};

export default meta;
