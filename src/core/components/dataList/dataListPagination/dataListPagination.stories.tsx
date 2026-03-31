import type { Meta, StoryObj } from '@storybook/react-vite';
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
        <DataList.Root entityLabel="Users" itemsCount={10} pageSize={2}>
            <DataList.Container>
                {[...new Array(10)].map((_value, index) => (
                    <DataList.Item key={index}>User {index}</DataList.Item>
                ))}
            </DataList.Container>
            <DataList.Pagination {...props} />
        </DataList.Root>
    ),
};

/**
 * Usage example of the DataList.Pagination component with no more elements to load.
 */
export const ShortList: Story = {
    args: {},
    render: (props) => (
        <DataList.Root entityLabel="Users" itemsCount={3} pageSize={10}>
            <DataList.Container>
                {[...new Array(3)].map((_value, index) => (
                    <DataList.Item key={index}>User {index}</DataList.Item>
                ))}
            </DataList.Container>
            <DataList.Pagination {...props} />
        </DataList.Root>
    ),
};

export default meta;
