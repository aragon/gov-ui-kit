import type { Meta, StoryObj } from '@storybook/react';
import { DialogAlert } from '..';
import { DialogAlertStoryComponent } from '../dialogAlertStoryComponent';

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

/**
 * Default usage of the `DialogAlert.Content` component
 */
export const Default: Story = {
    render: DialogAlertStoryComponent('content'),
};

/**
 * Usage example of the `DialogAlert.Content` component with overflowing content
 */
export const ScrollableContent: Story = {
    args: {
        children: (
            <div className="border-info-300 bg-info-100 flex h-screen w-full items-center justify-center border border-dashed">
                Overflowing content
            </div>
        ),
    },
    render: DialogAlertStoryComponent('content'),
};

/**
 * Use the noInset property to remove the default padding and implement a custom dialog layout.
 */
export const NoInset: Story = {
    args: { noInset: true },
    render: DialogAlertStoryComponent('content'),
};

export default meta;
