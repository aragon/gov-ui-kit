import type { Meta, StoryObj } from '@storybook/react';
import { DialogAlert } from '..';
import { DialogAlertStoryComponent } from '../dialogAlertStoryComponent';

const meta: Meta<typeof DialogAlert.Footer> = {
    title: 'Core/Components/Dialogs/DialogAlert/DialogAlert.Footer',
    component: DialogAlert.Footer,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13584-17263&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlert.Footer>;

/**
 * Default usage of the `DialogAlert.Footer` component
 */
export const Default: Story = {
    render: DialogAlertStoryComponent('footer'),
};

/**
 * The order of the dialog alert buttons on the footer is reversed for critical or warning variants.
 */
export const Critical: Story = {
    render: DialogAlertStoryComponent('footer', 'critical'),
};

export default meta;
