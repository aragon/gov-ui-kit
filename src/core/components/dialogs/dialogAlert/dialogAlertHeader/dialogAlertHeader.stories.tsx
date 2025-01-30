import type { Meta, StoryObj } from '@storybook/react';
import { DialogAlert } from '..';
import { DialogAlertStoryComponent } from '../dialogAlertStoryComponent';

const meta: Meta<typeof DialogAlert.Header> = {
    title: 'Core/Components/Dialogs/DialogAlert/DialogAlert.Header',
    component: DialogAlert.Header,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13558-16969&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlert.Header>;

/**
 * Default usage of the `DialogAlert.Header` component
 */
export const Default: Story = {
    args: { title: 'DialogAlert Title' },
    render: DialogAlertStoryComponent('header'),
};

/**
 * Usage of the `DialogAlert.Header` component with long titles
 */
export const LongTitle: Story = {
    args: { title: 'Long alert dialog titles are truncated, long alert dialog titles are truncated.' },
    render: DialogAlertStoryComponent('header'),
};

export default meta;
