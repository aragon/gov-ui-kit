import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';
import { IconType } from '../../icon';
import { InputText } from './inputText';

const meta: Meta<typeof InputText> = {
    title: 'Core/Components/Forms/InputText',
    component: InputText,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=17-292&mode=design&t=dehPZplRn0YEdOuB-4',
        },
    },
};

type Story = StoryObj<typeof InputText>;

/**
 * Default uncontrolled usage example of the InputText component.
 */
export const Default: Story = {
    args: {
        placeholder: 'Uncontrolled input',
    },
};

/**
 * Usage example of a controlled input.
 */
export const Controlled: Story = {
    render: (props) => {
        const [value, setValue] = useState<string>('');

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

        return <InputText onChange={handleChange} value={value} {...props} />;
    },
    args: {
        placeholder: 'Controlled input',
    },
};

/**
 * Usage example of an input with an addon element.
 */
export const Addon: Story = {
    args: {
        addon: 'Addon',
        placeholder: 'Input with addon',
    },
};

/**
 * Usage example of an input with max length restriction.
 */
export const MaxLength: Story = {
    args: {
        maxLength: 10,
        placeholder: 'Input with max length',
    },
};

/**
 * Usage example of an input with a left icon.
 */
export const IconLeft: Story = {
    args: {
        iconLeft: IconType.SEARCH,
        placeholder: 'Search...',
    },
};

/**
 * Usage example of an input with a right icon.
 */
export const IconRight: Story = {
    args: {
        iconRight: IconType.CALENDAR,
        placeholder: 'Pick a date',
    },
};

export default meta;
