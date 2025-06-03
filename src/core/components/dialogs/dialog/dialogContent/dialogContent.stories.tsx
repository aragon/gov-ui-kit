import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dialog } from '..';
import { DialogStoryComponent } from '../dialogStoryComponent';

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

/**
 * Default usage of the `Dialog.Content` component
 */
export const Default: Story = {
    render: DialogStoryComponent('content'),
};

/**
 * Usage example of the `Dialog.Content` component with overflowing content
 */
export const ScrollableContent: Story = {
    args: {
        children: (
            <div className="border-info-300 bg-info-100 flex h-screen w-full items-center justify-center border border-dashed">
                Overflowing content
            </div>
        ),
    },
    render: DialogStoryComponent('content'),
};

/**
 * Usage example of the `Dialog.Content` component with a multiline description
 */
export const MultilineDescription: Story = {
    args: {
        description:
            'A long description for the dialog which does not get truncated, a long description for the dialog which does not get truncated',
    },
    render: DialogStoryComponent('content'),
};

/**
 * Use the noInset property to remove the default padding and implement a custom dialog layout.
 */
export const NoInset: Story = {
    args: { noInset: true, description: undefined },
    render: DialogStoryComponent('content'),
};

export default meta;
