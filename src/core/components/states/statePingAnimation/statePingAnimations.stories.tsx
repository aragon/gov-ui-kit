import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatePingAnimation } from './statePingAnimation';

const meta: Meta<typeof StatePingAnimation> = {
    title: 'Core/Components/States/StatePingAnimation',
    component: StatePingAnimation,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=15073-29243&mode=design&t=FQrFXBU8bQ7ug6dM-4',
        },
    },
};

type Story = StoryObj<typeof StatePingAnimation>;

/**
 * Default usage of the `StatePingAnimation`
 */
export const Default: Story = {
    args: {
        variant: 'info',
    },
};

export default meta;
