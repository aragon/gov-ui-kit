import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputContainer } from './inputContainer';

const meta: Meta<typeof InputContainer> = {
    title: 'Core/Components/Forms/InputContainer',
    component: InputContainer,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=10055-28606&mode=design&t=dehPZplRn0YEdOuB-4',
        },
    },
};

type Story = StoryObj<typeof InputContainer>;

/**
 * Default usage example of the InputContainer component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
