import type { Meta, StoryObj } from '@storybook/react';
import { AlertCard } from './alertCard';
import { Link } from '../../link';
import { IconType } from '../../icon';

const meta: Meta<typeof AlertCard> = {
    title: 'Core/Components/Alerts/AlertCard',
    component: AlertCard,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=718-9005&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof AlertCard>;

/**
 * Default usage example of AlertCard component.
 */
export const Default: Story = {
    args: {
        message: 'Alert message',
        children: 'Alert description',
    },
};

/**
 * Usage example of the AlertCard component with custom children.
 */
export const WithCustomChildren: Story = {
    args: {
        message: 'Alert message',
        children: (
            <div className="flex flex-col gap-3">
                <p className="text-xl text-critical-500">Custom alert description</p>
                <Link href="www.example.com" target="_blank" iconRight={IconType.LINK_EXTERNAL}>
                    www.example.com
                </Link>
            </div>
        ),
    },
};

export default meta;
