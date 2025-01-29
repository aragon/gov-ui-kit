import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '..';
import { DialogStoryComponent } from '../dialogStoryComponent';

const meta: Meta<typeof Dialog.Header> = {
    title: 'Core/Components/Dialogs/Dialog/Dialog.Header',
    component: Dialog.Header,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8129-22048&mode=design&t=9f3O4hw9jWtb4fUb-4',
        },
    },
};

type Story = StoryObj<typeof Dialog.Header>;

/**
 * Default usage of the `Dialog.Header` component
 */
export const Default: Story = {
    args: { title: 'Dialog title' },
    render: DialogStoryComponent('header'),
};

/**
 * Usage of the `Dialog.Header` component with long titles
 */
export const LongTitle: Story = {
    args: { title: 'Long dialog titles are truncated, long dialog titles are truncated.' },
    render: DialogStoryComponent('header'),
};

/**
 * The `Dialog.Header` component does not render the close button when the onClose property is not set.
 */
export const NoCloseButton: Story = {
    args: { onClose: undefined },
    render: DialogStoryComponent('header'),
};

export default meta;
