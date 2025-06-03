import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DataList } from '..';

const meta: Meta<typeof DataList.Container> = {
    title: 'Core/Components/DataList/DataList.Container',
    component: DataList.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
        },
    },
};

type Story = StoryObj<typeof DataList.Container>;

/**
 * Default usage example of the DataList.Container component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <DataList.Root entityLabel="Items">
            <DataList.Container {...props}>
                <DataList.Item>Data List Item</DataList.Item>
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
