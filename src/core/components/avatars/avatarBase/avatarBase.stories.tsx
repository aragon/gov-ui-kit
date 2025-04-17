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
        src: 'https://aragon-1.mypinata.cloud/ipfs/QmX4q3fu1QkSfdVFUAmSUWziCmnXtitp2TVKLbrFVBcPvv',
    },
};

export default meta;
