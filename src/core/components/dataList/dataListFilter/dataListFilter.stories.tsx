import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataList } from '../index';

const meta: Meta<typeof DataList.Filter> = {
    title: 'Core/Components/DataList/DataList.Filter',
    component: DataList.Filter,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
        },
    },
};

type Story = StoryObj<typeof DataList.Filter>;

/**
 * Default usage example of the DataList.Filter component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <DataList.Root entityLabel="Users">
            <DataList.Filter {...props} />
        </DataList.Root>
    ),
};

export default meta;
