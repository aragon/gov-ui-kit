import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconType } from '../../icon';
import { AvatarIcon } from './avatarIcon';

const meta: Meta<typeof AvatarIcon> = {
    title: 'Core/Components/Avatars/AvatarIcon',
    component: AvatarIcon,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=7853-14315&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof AvatarIcon>;

/**
 * Default usage example of AvatarIcon component.
 */
export const Default: Story = {
    args: {
        icon: IconType.APP_PROPOSALS,
    },
};

export default meta;
