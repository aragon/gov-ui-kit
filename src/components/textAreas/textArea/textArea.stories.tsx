import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ChangeEvent } from 'react';
import { TextArea, type ITextAreaProps } from './textArea';

const meta: Meta<typeof TextArea> = {
    title: 'components/TextAreas/TextArea',
    component: TextArea,
    tags: ['autodocs'],
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

const ControlledComponent = (props: ITextAreaProps) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);

    return <TextArea value={value} onChange={handleChange} {...props} />;
};

/**
 * Usage example of a controlled TextArea.
 */
export const Controlled: Story = {
    render: (props) => <ControlledComponent {...props} />,
    args: {
        placeholder: 'Controlled TextArea',
    },
};

export default meta;
