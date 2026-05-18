import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button';
import { Link } from '../link';
import { Clipboard } from './clipboard';

const meta: Meta<typeof Clipboard> = {
    title: 'Core/Components/Clipboard',
    component: Clipboard,
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

/**
 * Example of the Clipboard component with a Link as a child.
 */
export const WithLink: Story = {
    args: {
        copyValue: 'http://example.com',
        variant: 'avatar-white-bg',
    },
    render: (props) => (
        <Clipboard {...props}>
            <Link href={props.copyValue}>Link label</Link>
        </Clipboard>
    ),
};

/**
 * Example of the Clipboard component with text as a child.
 */
export const WithText: Story = {
    args: {
        copyValue: '0x123456789',
        variant: 'avatar-white-bg',
    },
    render: (props) => (
        <Clipboard {...props}>
            <p>{`${props.copyValue.slice(0, 5)}...`}</p>
        </Clipboard>
    ),
};

/**
 * Example of the Clipboard component inside a form, demonstrating that clicking the copy
 * button does not trigger form submission.
 */
export const InsideForm: Story = {
    args: {
        copyValue: '0x123456789',
    },
    render: (props) => (
        <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
                e.preventDefault();
                alert('Form submitted!');
            }}
        >
            <Clipboard {...props} />
            <Button type="submit">Submit form</Button>
        </form>
    ),
};

/**
 * Example of the Clipboard component inside a clickable parent, demonstrating that clicking the copy
 * button does not propagate the click event to the parent element.
 */
export const InsideClickable: Story = {
    args: {
        copyValue: '0x123456789',
        variant: 'avatar-white-bg',
    },
    render: (props) => (
        <button
            className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 hover:bg-neutral-50"
            onClick={() => alert('Parent clicked!')}
            type="button"
        >
            <span className="text-neutral-500 text-sm">{props.copyValue}</span>
            <Clipboard {...props} />
        </button>
    ),
};

export default meta;
