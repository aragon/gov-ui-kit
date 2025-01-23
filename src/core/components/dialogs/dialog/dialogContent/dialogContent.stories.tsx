import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from '..';
import { Button } from '../../../button';
import { type IDialogContentProps } from './dialogContent';

const meta: Meta<typeof Dialog.Content> = {
    title: 'Core/Components/Dialogs/Dialog/Dialog.Content',
    component: Dialog.Content,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8129-22048&mode=design&t=9f3O4hw9jWtb4fUb-4',
        },
    },
};

type Story = StoryObj<typeof Dialog.Content>;

const ControlledComponent = (props: IDialogContentProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Show Dialog
            </Button>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Header title="Dialog title" description="Optional dialog description" />
                <Dialog.Content {...props} />
                <Dialog.Footer
                    primaryAction={{ label: 'Primary action' }}
                    secondaryAction={{ label: 'Secondary action' }}
                    alert={{ message: 'Very informative alert message' }}
                />
            </Dialog.Root>
        </>
    );
};

/**
 * Default usage of the `Dialog.Content` component
 */
export const Default: Story = {
    args: {
        children: <p className="py-2 text-neutral-800">Very important content here!</p>,
    },
    render: (props) => <ControlledComponent {...props} />,
};

/**
 * Usage example of `Dialog.Content` component with overflowing content
 */
export const ScrollableContent: Story = {
    args: {
        children: (
            <div className="flex h-screen w-full items-center justify-center border border-dashed border-info-300 bg-info-100">
                Overflowing content
            </div>
        ),
    },
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
