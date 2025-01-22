import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DialogAlert, type IDialogAlertContentProps } from '..';
import { Button } from '../../../button';

const meta: Meta<typeof DialogAlert.Content> = {
    title: 'Core/Components/Dialogs/DialogAlert/DialogAlert.Content',
    component: DialogAlert.Content,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13558-17025&mode=design&t=2c10sWNHo18bHNd3-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlert.Content>;

const ControlledComponent = (props: IDialogAlertContentProps) => {
    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Show DialogAlert
            </Button>
            <DialogAlert.Root open={open} onOpenChange={setOpen}>
                <DialogAlert.Header title="DialogAlert Title" />
                <DialogAlert.Content {...props} />
                <DialogAlert.Footer
                    actionButton={{ label: 'Action', onClick: handleCloseModal }}
                    cancelButton={{ label: 'Cancel', onClick: handleCloseModal }}
                />
            </DialogAlert.Root>
        </>
    );
};

/**
 * Default usage of the `DialogAlert.Content` component
 */
export const Default: Story = {
    args: {
        children: <p>Very important content here!</p>,
    },
    render: (props) => <ControlledComponent {...props} />,
};

/**
 * Usage example of `DialogAlert.Content` component with overflowing content
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
