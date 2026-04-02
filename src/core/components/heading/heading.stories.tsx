import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './heading';

const meta: Meta<typeof Heading> = {
    title: 'Core/Components/Heading',
    component: Heading,

    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Governance-UI-Kit?type=design&node-id=12425%3A9576&mode=design&t=Y5oyqUT7xs50BPvq-1',
        },
        docs: {
            description: {
                component: 'Component will auto size at `md` breakpoint.',
            },
        },
    },
};

type Story = StoryObj<typeof Heading>;

/**
 * Default usage example of the Heading component.
 */
export const Default: Story = {
    render: () => {
        return (
            <div className="flex-col space-y-4">
                <Heading size="h1">Default h1 size</Heading>
                <Heading size="h2">Default h2 size</Heading>
                <Heading size="h3">Default h3 size</Heading>
                <Heading size="h4">Default h4 size</Heading>
                <Heading size="h5">Default h5 size</Heading>
            </div>
        );
    },
};

/**
 * Custom usage example of the Heading component where the <h> tag size is specified by the user.
 * Inspect to see the semantic element override.
 */
export const CustomAs: Story = {
    render: () => {
        return (
            <div className="flex-col space-y-4">
                <Heading as="h5" size="h1">
                    Semantic h5 tag as h1 size
                </Heading>
                <Heading as="h4" size="h2">
                    Semantic h4 tag as h2 size
                </Heading>
                <Heading as="h3" size="h3">
                    Semantic h3 tag as h3 size
                </Heading>
                <Heading as="h2" size="h4">
                    Semantic h2 tag as h4 size
                </Heading>
                <Heading as="h1" size="h5">
                    Semantic h1 tag as h5 size
                </Heading>
            </div>
        );
    },
};
export default meta;
