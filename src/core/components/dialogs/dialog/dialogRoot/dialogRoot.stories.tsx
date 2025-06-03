import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '..';
import { DialogStoryComponent } from '../dialogStoryComponent';
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
    render: DialogStoryComponent('root'),
};

export default meta;
