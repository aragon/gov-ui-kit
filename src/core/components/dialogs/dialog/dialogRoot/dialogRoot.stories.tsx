import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from '..';
import { Button } from '../../../button';
import style from './index.css?raw';

const meta: Meta<typeof Dialog.Root> = {
    title: 'Core/Components/Dialogs/Dialog/Dialog.Root',
    component: Dialog.Root,
    parameters: {
        style,
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13558-17025&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof Dialog.Root>;

/**
 * Default usage of the `Dialog.Root` component
 */
export const Default: Story = {
    args: {},
    render: (props) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button variant="primary" onClick={() => setOpen(true)}>
                    Show Dialog
                </Button>
                <Dialog.Root {...props} open={open} onOpenChange={setOpen}>
                    <Dialog.Header title="Dialog Title" />
                    <Dialog.Content>
                        <div className="h-screen w-full border-2 border-primary-500" />
                    </Dialog.Content>
                    <Dialog.Footer
                        primaryAction={{ label: 'Primary action' }}
                        secondaryAction={{ label: 'Secondary action' }}
                        alert={{ message: 'Very informative alert message' }}
                    />
                </Dialog.Root>
            </>
        );
    },
};

export default meta;
