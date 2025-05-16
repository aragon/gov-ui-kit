import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../link';
import { Clipboard } from './clipboard';

const meta: Meta<typeof Clipboard> = {
    title: 'Core/Components/Clipboard',
    component: Clipboard,
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

type Story = StoryObj<typeof Clipboard>;

/**
 * Default usage example of the Clipboard component.
 */
export const Default: Story = {
    args: {
        text: 'Sample text to copy...',
    },
};

export const WithLink: Story = {
    args: {
        text: 'http://example.com',
        variant: 'avatar-white-bg',
    },
    render: (args) => (
        <span className="flex items-center gap-3">
            <Link href={args.text}>Link label</Link>
            <Clipboard text={args.text} variant={args.variant} />
        </span>
    ),
};

export const WithText: Story = {
    args: {
        text: '0x123456789',
        variant: 'avatar-white-bg',
    },
    render: (args) => (
        <span className="flex items-center gap-3">
            <p>{`${args.text.slice(0, 5)}...`}</p>
            <Clipboard text={args.text} variant={args.variant} />
        </span>
    ),
};

export default meta;
