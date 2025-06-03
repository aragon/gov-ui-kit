import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
    title: 'Core/Components/Spinner',
    component: Spinner,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=7806-26769&mode=dev',
        },
    },
};

type Story = StoryObj<typeof Spinner>;

/**
 * Default usage example of the Spinner component.
 */
export const Default: Story = {
    args: {
        variant: 'neutral',
        size: 'lg',
    },
};

/**
 * Usage of a static spinner through the isLoading property.
 */
export const Static: Story = {
    args: {
        variant: 'neutral',
        size: 'lg',
        isLoading: false,
    },
};

/**
 * Usage example of the Spinner component with responsive size.
 */
export const ResponsiveSize: Story = {
    args: {
        variant: 'neutral',
        size: 'sm',
        responsiveSize: { lg: 'xl' },
    },
};

export default meta;
