import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputDate } from './inputDate';

const meta: Meta<typeof InputDate> = {
    title: 'Core/Components/Forms/InputDate',
    component: InputDate,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=10080-1466&mode=design&t=2bLCEeKZ7ueBboTs-4',
        },
    },
};

type Story = StoryObj<typeof InputDate>;

/**
 * Default usage example of the InputDate component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
