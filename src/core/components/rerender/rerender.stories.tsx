import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Rerender } from './rerender';

const meta: Meta<typeof Rerender> = {
    title: 'Core/Components/Rerender',
    component: Rerender,
};

type Story = StoryObj<typeof Rerender>;

/**
 * Default usage example of the Rerender component.
 */
export const Default: Story = {
    render: (args) => (
        <Rerender {...args}>{(time) => <div>Current Time: {new Date(time).toISOString()}</div>}</Rerender>
    ),
    args: {
        intervalDuration: 1000,
    },
};

export default meta;
