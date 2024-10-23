import type { Meta, StoryObj } from '@storybook/react';
import { AvatarBase } from './avatarBase';

const meta: Meta<typeof AvatarBase> = {
    title: 'Core/Components/Avatars/AvatarBase',
    component: AvatarBase,
};

type Story = StoryObj<typeof AvatarBase>;

/**
 * AvatarBase is a basic component that renders an image based on the component set in the GukCoreModules context.
 * It must be used in all GovKit components whenever an image needs to be rendered.
 */
export const Default: Story = {
    args: {
        src: 'https://cdn.discordapp.com/icons/672466989217873929/acffa3e9e09ac5962ff803a5f8649040.webp?size=240',
    },
};

export default meta;
