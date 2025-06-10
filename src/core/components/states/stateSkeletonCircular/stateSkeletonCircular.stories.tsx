import type { Meta, StoryObj } from '@storybook/react-vite';
import { StateSkeletonCircular } from './stateSkeletonCircular';

const meta: Meta<typeof StateSkeletonCircular> = {
    title: 'Core/Components/States/StateSkeletonCircular',
    component: StateSkeletonCircular,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=16106-38321&mode=design&t=8BGCESGcufn0gpI9-4',
        },
        backgrounds: { default: 'neutral-800' },
    },
};

type Story = StoryObj<typeof StateSkeletonCircular>;

/**
 * Default usage example of the StateSkeletonCircular component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
