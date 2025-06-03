import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconType } from '../../icon';
import { CardSummary } from './cardSummary';

const meta: Meta<typeof CardSummary> = {
    title: 'Core/Components/Cards/CardSummary',
    component: CardSummary,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=10157-27206&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof CardSummary>;

/**
 * Default usage example of the CardSummary component.
 */
export const Default: Story = {
    args: {
        value: '5',
        description: 'Proposals created',
        action: { label: 'Proposal' },
        icon: IconType.APP_PROPOSALS,
    },
};

/**
 * Set the `isStacked` property to false to render a CardSummary component with a horizontal layout (only rendered on screens > MD).
 */
export const HorizontalLayout: Story = {
    args: {
        value: '22',
        description: 'Members',
        action: { label: 'Delegate' },
        icon: IconType.APP_MEMBERS,
        isStacked: false,
    },
};

export default meta;
