import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InputNumberMax } from './inputNumberMax';

const meta: Meta<typeof InputNumberMax> = {
    title: 'Core/Components/Forms/InputNumberMax',
    component: InputNumberMax,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=17-292&mode=design&t=dehPZplRn0YEdOuB-4',
        },
    },
};

type Story = StoryObj<typeof InputNumberMax>;

/**
 * Default usage example of the InputNumberMax component.
 */
export const Default: Story = {
    args: {
        placeholder: 'Placeholder',
        max: 54120,
    },
};

/**
 * Usage example of a controlled InputNumberMax component.
 */
export const Controlled: Story = {
    render: ({ onChange, ...props }) => {
        const [value, setValue] = useState<string>();

        return <InputNumberMax value={value} onChange={setValue} {...props} />;
    },
    args: {
        placeholder: 'Controlled input',
        max: 120500500.05,
    },
};

export default meta;
