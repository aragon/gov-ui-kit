import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';
import style from './index.css?raw';

const meta: Meta<typeof Avatar> = {
    title: 'Core/Components/Avatars/Avatar',
    component: Avatar,
    parameters: {
        style,
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=11953-12188&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof Avatar>;

/**
 * Default usage example of the Avatar component.
 */
export const Default: Story = {
    args: {
        src: 'https://cdn.discordapp.com/icons/672466989217873929/acffa3e9e09ac5962ff803a5f8649040.webp?size=240',
        size: 'sm',
    },
};

/**
 *  Usage of the Avatar component with the default fallback.
 */
export const DefaultFallback: Story = {
    args: {
        responsiveSize: { sm: 'md' },
    },
};

/**
 * Avatar component with a custom fallback
 */
export const CustomFallback: Story = {
    args: {
        src: 'broken-image',
        size: 'lg',
        fallback: <span className="flex size-full items-center justify-center bg-primary-400 text-neutral-0">SO</span>,
    },
};

export default meta;
