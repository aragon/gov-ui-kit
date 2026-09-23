import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';
import { TextArea } from './textArea';

const meta: Meta<typeof TextArea> = {
    title: 'Core/Components/Forms/TextArea',
    component: TextArea,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=17-524&mode=design&t=iWY6TlaWc8mCTNVP-4',
        },
    },
};

type Story = StoryObj<typeof TextArea>;

/**
 * Default uncontrolled usage example of the TextArea component.
 */
export const Default: Story = {
    args: {
        placeholder: 'Uncontrolled TextArea',
    },
};

/**
 * Usage example of a controlled TextArea.
 */
export const Controlled: Story = {
    render: (props) => {
        const [value, setValue] = useState<string>('');

        const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);

        return <TextArea onChange={handleChange} value={value} {...props} />;
    },
    args: {
        placeholder: 'Controlled TextArea',
    },
};

/**
 * A disabled textarea keeps its content readable but takes no focus or input.
 */
export const Disabled: Story = {
    args: {
        label: 'Proposal summary',
        value: 'Fund the Q3 grants program.',
        disabled: true,
    },
};

/**
 * Failed validation: the `critical` variant colours the field and `alert` carries
 * the reason. Set both — the variant alone leaves the user without a message.
 */
export const Critical: Story = {
    args: {
        label: 'Proposal summary',
        value: '',
        placeholder: 'What should the DAO decide on?',
        variant: 'critical',
        alert: { message: 'Summary is required', variant: 'critical' },
    },
};

export default meta;
