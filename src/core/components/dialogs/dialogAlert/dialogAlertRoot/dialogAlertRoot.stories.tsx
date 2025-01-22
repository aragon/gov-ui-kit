import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DialogAlert } from '..';
import { Button } from '../../../button';
import style from './index.css?raw';

const meta: Meta<typeof DialogAlert.Root> = {
    title: 'Core/Components/Dialogs/DialogAlert/DialogAlert.Root',
    component: DialogAlert.Root,
    parameters: {
        style,
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13558-17025&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlert.Root>;

/**
 * Default usage of the `DialogAlert.Root` component
 */
export const Default: Story = {
    render: (props) => {
        const [open, setOpen] = useState(false);

        const handleCloseModal = () => {
            setOpen(false);
        };

        return (
            <>
                <Button variant="primary" onClick={() => setOpen(true)}>
                    Show DialogAlert
                </Button>
                <DialogAlert.Root {...props} open={open} onOpenChange={setOpen}>
                    <DialogAlert.Header title="DialogAlert Title" />
                    <DialogAlert.Content>
                        <p>Very important content here!</p>
                    </DialogAlert.Content>
                    <DialogAlert.Footer
                        actionButton={{ label: 'Action', onClick: handleCloseModal }}
                        cancelButton={{ label: 'Cancel', onClick: handleCloseModal }}
                    />
                </DialogAlert.Root>
            </>
        );
    },
};

export default meta;
