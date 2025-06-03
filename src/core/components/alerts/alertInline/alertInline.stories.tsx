import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { AlertInline } from './alertInline';

const meta: Meta<typeof AlertInline> = {
    title: 'Core/Components/Alerts/AlertInline',
    component: AlertInline,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=22-208&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof AlertInline>;

/**
 * Default usage example of AlertInline component.
 */
export const Default: Story = {
    args: {
        message: 'Alert Message',
    },
};

export default meta;
