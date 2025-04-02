import type { Meta, StoryObj } from '@storybook/react';
import { AlertCard } from './alertCard';

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
            <div className="flex flex-col gap-2">
                <div className="flex h-24 w-full items-center justify-center border border-dashed border-info-300 bg-info-100">
                    Customisable content
                </div>
            </div>
        ),
    },
};

export default meta;
