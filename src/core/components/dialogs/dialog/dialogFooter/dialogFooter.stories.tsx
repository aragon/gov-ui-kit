import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '..';
import { DialogStoryComponent } from '../dialogStoryComponent';

const meta: Meta<typeof Dialog.Footer> = {
    title: 'Core/Components/Dialogs/Dialog/Dialog.Footer',
    component: Dialog.Footer,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13584-17263&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof Dialog.Footer>;

/**
 * Default usage of the `Dialog.Footer` component
 */
export const Default: Story = {
    render: DialogStoryComponent('footer'),
};

/**
 * The `Dialog.Footer` can be rendered with no actions add bottom spacing and display the dialog shadow
 */
export const Actionless: Story = {
    args: { primaryAction: undefined, secondaryAction: undefined },
    render: DialogStoryComponent('footer'),
};

/**
 * Use the wizard variant of the `Dialog.Footer` component to render wizards on dialogs.
 */
export const WizardVariant: Story = {
    args: { variant: 'wizard' },
    render: DialogStoryComponent('footer'),
};

/**
 * Set the `hasError` property to true to display an error feedback on the `Dialog.Footer` component.
 */
export const WithError: Story = {
    args: { hasError: true, variant: 'wizard' },
    render: DialogStoryComponent('footer'),
};

export default meta;
