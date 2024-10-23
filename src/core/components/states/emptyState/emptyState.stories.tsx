import type { Meta, StoryObj } from '@storybook/react';
import { IconType } from '../../icon';
import { EmptyState } from './emptyState';

const meta: Meta<typeof EmptyState> = {
    title: 'Core/Components/States/EmptyState',
    component: EmptyState,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Governance-UI-Kit?type=design&node-id=10095%3A21633&mode=dev&t=FtMO7nBXAzYBFGaW-1',
        },
    },
};

type Story = StoryObj<typeof EmptyState>;

/**
 * Default EmptyState component with minimum props.
 */
export const Default: Story = {
    args: {
        heading: 'Heading',
        description: 'Description',
        objectIllustration: { object: 'LIGHTBULB' },
    },
};

/**
 * Stacked EmptyState component with full props examples for Object Illustration.
 */
export const StackedFullWithObject: Story = {
    args: {
        heading: 'Heading',
        description: 'Description',
        objectIllustration: { object: 'LIGHTBULB' },
        primaryButton: {
            label: 'Label',
            iconLeft: IconType.PLUS,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Primary Button Clicked'),
        },
        secondaryButton: {
            label: 'Label',
            iconLeft: IconType.PLUS,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Secondary Button Clicked'),
        },
    },
};
/**
 * Non-Stacked EmptyState component with full props examples for Object Illustration. <br />
 * **Warning:** Non-Stacked EmptyState with Human Illustration is not supported visually.
 * As displayed, use an object illustration instead for best layout.
 */
export const NonStackedFullWithObject: Story = {
    args: {
        heading: 'Heading',
        description: 'Description',
        isStacked: false,
        objectIllustration: { object: 'LIGHTBULB' },
        primaryButton: {
            label: 'Label',
            iconLeft: IconType.PLUS,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Primary Button Clicked'),
        },
        secondaryButton: {
            label: 'Label',
            iconLeft: IconType.PLUS,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Secondary Button Clicked'),
        },
    },
};
/**
 * Stacked EmptyState component with full props examples for Human Illustation.
 */
export const StackedFullWithHuman: Story = {
    args: {
        heading: 'Heading',
        description: 'Description',
        humanIllustration: {
            body: 'VOTING',
            hairs: 'MIDDLE',
            accessory: 'EARRINGS_RHOMBUS',
            sunglasses: 'BIG_ROUNDED',
            expression: 'SMILE',
        },
        primaryButton: {
            label: 'Label',
            iconLeft: IconType.PLUS,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Primary Button Clicked'),
        },
        secondaryButton: {
            label: 'Label',
            iconLeft: IconType.PLUS,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Secondary Button Clicked'),
        },
    },
};

export default meta;
