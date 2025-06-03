import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { StateSkeletonBar } from './stateSkeletonBar';

const meta: Meta<typeof StateSkeletonBar> = {
    title: 'Core/Components/States/StateSkeletonBar',
    component: StateSkeletonBar,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=14335-29808&mode=design&t=eY5zUwpG8UWKcdMd-4',
        },
        backgrounds: { default: 'neutral-800' },
    },
};

type Story = StoryObj<typeof StateSkeletonBar>;

/**
 * Default usage example of the StateSkeletonBar component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
