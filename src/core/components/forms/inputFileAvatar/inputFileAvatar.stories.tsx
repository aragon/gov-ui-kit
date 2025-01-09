import type { Meta, StoryObj } from '@storybook/react';
import { InputFileAvatar } from './inputFileAvatar';

const meta: Meta<typeof InputFileAvatar> = {
    title: 'Core/Components/Forms/InputFileAvatar',
    component: InputFileAvatar,

    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Governance-UI-Kit?type=design&node-id=11970%3A18464&mode=design&t=vme2iG22v3jenK5f-1',
        },
    },
};

type Story = StoryObj<typeof InputFileAvatar>;

/**
 * Default usage example of the InputFileAvatar component.
 */
export const Default: Story = {};

/**
 * Usage example of the InputFileAvatar component with an initial value.
 */
export const InitialValue: Story = {
    args: {
        initialValue: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    },
};

/**
 * Usage example with onCancel callback
 */
export const WithOnCancel: Story = {
    args: {
        onCancel: () => alert('Cancel clicked'),
    },
};

export default meta;
