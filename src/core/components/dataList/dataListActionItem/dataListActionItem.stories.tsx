import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconType } from '../../icon';
import { DataList } from '../index';

const meta: Meta<typeof DataList.ActionItem> = {
    title: 'Core/Components/DataList/DataList.ActionItem',
    component: DataList.ActionItem,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
        },
    },
};

type Story = StoryObj<typeof DataList.ActionItem>;

/**
 * Primary variant — used for affirmative actions such as "Add custom address".
 */
export const Primary: Story = {
    args: {
        children: 'Add custom address',
        icon: IconType.PLUS,
        variant: 'primary',
    },
};

/**
 * Neutral variant — used for back/secondary actions such as returning to a previous step.
 */
export const Neutral: Story = {
    args: {
        children: 'Back to selection',
        icon: IconType.CHEVRON_LEFT,
        variant: 'neutral',
    },
};

export default meta;
