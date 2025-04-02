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

const DefaultChildComponent = (childCount: number) =>
    [...Array<number>(childCount)].map((_, index) => (
        <div key={`item-${index.toString()}`} className="py-2">
            Item {index + 1} content
        </div>
    ));

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
        children: DefaultChildComponent(4),
    },
};

export default meta;
