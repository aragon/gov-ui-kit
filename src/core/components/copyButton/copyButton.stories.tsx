import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from './copyButton';

const meta: Meta<typeof CopyButton> = {
    title: 'Core/Components/CopyButton',
    component: CopyButton,
    argTypes: {
        text: { control: 'text' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=25558-73306',
        },
    },
};

type Story = StoryObj<typeof CopyButton>;

/**
 * Default usage example of the Button component.
 */
export const Default: Story = {
    args: {
        text: 'Sample text to copy...',
    },
};

export default meta;
