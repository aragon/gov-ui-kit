import type { Meta, StoryObj } from '@storybook/react';
import { DialogAlert } from '..';
import { DialogAlertStoryComponent } from '../dialogAlertStoryComponent';
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
    args: {},
    render: DialogAlertStoryComponent('root'),
};

export default meta;
