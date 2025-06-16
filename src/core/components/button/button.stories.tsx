import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconType } from '../icon';
import { Button } from './button';

const meta: Meta<typeof Button> = {
    title: 'Core/Components/Button',
    component: Button,
    argTypes: {
        href: { control: 'text' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=7980-15610&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof Button>;

/**
 * Default usage example of the Button component.
 */
export const Default: Story = {
    args: {
        children: 'Button label',
    },
};

/**
 * Set the `iconLeft` property when rendering only an icon inside the Button component.
 */
export const OnlyIcon: Story = {
    args: {
        iconLeft: IconType.PLUS,
    },
};

/**
 * The Button component renders a <a /> tag when the href property is set.
 */
export const Link: Story = {
    args: {
        children: 'Link label',
        href: 'https://www.google.com',
        target: '_blank',
    },
};

/**
 * Button component with a size that changes depending on the current breakpoint.
 */
export const ResponsiveButton: Story = {
    args: {
        size: 'md',
        responsiveSize: { xl: 'lg' },
        children: 'Responsive button',
    },
};

export default meta;
