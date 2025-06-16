import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCard } from './checkboxCard';

const meta: Meta<typeof CheckboxCard> = {
    title: 'Core/Components/Forms/CheckboxCard',
    component: CheckboxCard,
    argTypes: {
        disabled: { control: 'boolean' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8889-18652&mode=design&t=bosvPKsTZwUlGgoG-4',
        },
    },
};

type Story = StoryObj<typeof CheckboxCard>;

/**
 * Default usage of the CheckboxCard component
 */
export const Default: Story = {
    args: {
        avatar: 'https://assets-global.website-files.com/5e997428d0f2eb13a90aec8c/63f47db62df04b569e4e004e_icon_aragon.svg',
        label: 'Checkbox label',
        tag: { label: 'Tag', variant: 'info' },
    },
};

/**
 * Default usage of the CheckboxCard component
 */
export const WithDescription: Story = {
    args: {
        avatar: 'https://assets-global.website-files.com/5e997428d0f2eb13a90aec8c/63f47db62df04b569e4e004e_icon_aragon.svg',
        label: 'Checkbox label',
        description: 'Checkbox description',
        tag: { label: 'Tag', variant: 'info' },
    },
};

/**
 * Usage of the CheckboxCard component with children when checked
 */
export const WithChildrenWhenChecked: Story = {
    args: {
        avatar: 'https://assets-global.website-files.com/5e997428d0f2eb13a90aec8c/63f47db62df04b569e4e004e_icon_aragon.svg',
        label: 'Checkbox label',
        description: 'Checkbox description',
        tag: { label: 'Tag', variant: 'info' },
        children: <div>Children</div>,
    },
};

/**
 * CheckboxCard in indeterminate state
 */
export const IndeterminateState: Story = {
    args: {
        checked: 'indeterminate',
        avatar: 'https://assets-global.website-files.com/5e997428d0f2eb13a90aec8c/63f47db62df04b569e4e004e_icon_aragon.svg',
        label: 'Label',
        description: 'Indeterminate checkbox',
        tag: { label: 'Tag', variant: 'warning' },
    },
};

export default meta;
