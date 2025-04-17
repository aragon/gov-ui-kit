import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'Core/Components/Tooltip',
    component: Tooltip,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=12848-9526&mode=design&t=2jQprkV9RMKUhSN3-4',
        },
    },
};

type Story = StoryObj<typeof Tooltip>;

/**
 * Default usage example of the `Tooltip` component.
 */
export const Default: Story = {
    args: {
        content: 'Message',
    },
    render: (props) => {
        return (
            <div className="flex h-16 items-end">
                <Tooltip {...props}>
                    <p className="text-primary-300 border p-2">Hover over me!</p>
                </Tooltip>
            </div>
        );
    },
};

/**
 * Controlled usage of the `Tooltip` component
 */
export const Controlled: Story = {
    args: {
        content: 'Message',
    },
    render: (props) => {
        const [open, setOpen] = useState(false);

        return (
            <div className="flex h-16 items-end">
                <Tooltip {...props} open={open} onOpenChange={setOpen}>
                    <p className="text-primary-300 border p-2">Hover over me!</p>
                </Tooltip>
            </div>
        );
    },
};

export default meta;
