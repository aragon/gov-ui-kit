import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddressOutput } from './addressOutput';

const meta: Meta<typeof AddressOutput> = {
    title: 'Core/Components/AddressOutput',
    component: AddressOutput,
    argTypes: {
        address: {
            control: 'text',
            description: 'Address to display, always the source of truth of the component.',
        },
        label: {
            control: 'text',
            description: 'Display label for the address, e.g. an ENS name. Defaults to the truncated address.',
        },
        showCompleteAddress: {
            control: 'boolean',
            description:
                'Renders the full checksummed address instead of the truncated one. Ignored when label is set.',
        },
        href: {
            control: 'text',
            description:
                'URL the label links to, typically a block explorer. A truthy value marks the address as link-like: tap navigates instead of opening the reveal and the copy control turns primary.',
        },
        isExternal: {
            control: 'boolean',
            description: 'Whether the href link is external (new tab + arrow). Set false for in-app navigation.',
        },
        copy: {
            control: 'boolean',
            description: 'Renders an inline copy control that copies the full checksummed address.',
        },
        reveal: {
            control: 'boolean',
            description: 'Reveals the full checksummed address on hover, keyboard focus and tap.',
        },
    },
};

type Story = StoryObj<typeof AddressOutput>;

const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';

/**
 * Default usage. `reveal` and `copy` are on by default: the full checksummed address is revealed on hover,
 * keyboard focus and tap, with an inline copy control.
 */
export const Default: Story = {
    args: { address },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

/**
 * The label stays the display only; the reveal shows the same checksummed address whatever the label is.
 */
export const WithLabel: Story = {
    args: { address, label: 'vitalik.eth' },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

/**
 * Escape hatch that renders the full checksummed address instead of the truncated one.
 */
export const Full: Story = {
    args: { address, showCompleteAddress: true },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

/**
 * With `href`, the label is rendered as an external explorer link, so a tap keeps navigating. The reveal then only
 * opens on hover and keyboard focus, and the copy control turns primary to match the link.
 */
export const Link: Story = {
    args: { address, href: `https://etherscan.io/address/${address}` },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

/**
 * Flags can be turned off independently.
 */
export const PlainText: Story = {
    args: { address, copy: false, reveal: false },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

export default meta;
