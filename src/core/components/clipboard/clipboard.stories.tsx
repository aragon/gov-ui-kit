import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../link';
import { Clipboard } from './clipboard';

const meta: Meta<typeof Clipboard> = {
    title: 'Core/Components/Clipboard',
    component: Clipboard,
    argTypes: {
        copyValue: { control: 'text' },
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
        copyValue: 'Sample text to copy...',
    },
};

export const WithLink: Story = {
    args: {
        copyValue: 'http://example.com',
        variant: 'avatar-white-bg',
    },
    render: (args) => (
        <Clipboard copyValue={args.copyValue} variant={args.variant}>
            <Link href={args.copyValue}>Link label</Link>
        </Clipboard>
    ),
};

export const WithText: Story = {
    args: {
        copyValue: '0x123456789',
        variant: 'avatar-white-bg',
    },
    render: (args) => (
        <Clipboard copyValue={args.copyValue} variant={args.variant}>
            <p>{`${args.copyValue.slice(0, 5)}...`}</p>
        </Clipboard>
    ),
};

export default meta;
