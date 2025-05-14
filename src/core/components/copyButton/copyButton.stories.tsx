import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from './copyButton';

const meta: Meta<typeof CopyButton> = {
    title: 'Core/Components/CopyButton',
    component: CopyButton,
    // argTypes: {
    //     href: { control: 'text' },
    // },
    // parameters: {
    //     design: {
    //         type: 'figma',
    //         url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=7980-15610&t=RVJHJFTrLMnhgYnJ-4',
    //     },
    // },
};

type Story = StoryObj<typeof CopyButton>;

/**
 * Default usage example of the Button component.
 */
export const Default: Story = {
    args: {
        children: 'Button label',
    },
};

export default meta;
