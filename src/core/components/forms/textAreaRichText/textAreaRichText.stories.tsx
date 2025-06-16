import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../button';
import { Dialog } from '../../dialogs';
import style from './index.css?raw';
import { TextAreaRichText } from './textAreaRichText';

const meta: Meta<typeof TextAreaRichText> = {
    title: 'Core/Components/Forms/TextAreaRichText',
    component: TextAreaRichText,
    parameters: {
        style,
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=10095-8687&mode=design&t=RRfZug69k5JnpYXM-4',
        },
    },
};

type Story = StoryObj<typeof TextAreaRichText>;

/**
 * Default uncontrolled usage example of the TextAreaRichText component.
 */
export const Default: Story = {
    args: {
        placeholder: 'Placeholder',
    },
};

/**
 * Usage example of a controlled TextAreaRichText component.
 */
export const Controlled: Story = {
    args: {
        label: 'Controlled component',
        helpText: 'Make sure this is hidden when component is expanded',
    },
    render: ({ onChange, ...props }) => {
        const [value, setValue] = useState(
            '<p>Hello <strong>dev</strong>, check this <a href="https://aragon.org" target="_blank">link</a>.</p>',
        );

        return <TextAreaRichText value={value} onChange={setValue} {...props} />;
    },
};

/**
 * Set the `useFocusTrap` dialog property to false to correctly use the expand behaviour of the TextAreaRichText
 * component inside a dialog
 */
export const InsideDialog: Story = {
    render: (props) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
                <Dialog.Root open={isOpen} onOpenChange={setIsOpen} useFocusTrap={false}>
                    <Dialog.Content className="p-4">
                        <TextAreaRichText {...props} />
                    </Dialog.Content>
                </Dialog.Root>
            </>
        );
    },
};

export default meta;
