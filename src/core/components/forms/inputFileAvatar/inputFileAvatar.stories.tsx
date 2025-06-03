import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InputFileAvatar } from './inputFileAvatar';
import type { IInputFileAvatarValue } from './inputFileAvatar.api';

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
export const Default: Story = {
    render: (props) => {
        const [value, setValue] = useState<IInputFileAvatarValue>();

        return <InputFileAvatar {...props} value={value} onChange={setValue} />;
    },
};

/**
 * Usage example of the InputFileAvatar component with an initial value.
 */
export const InitialValue: Story = {
    args: {
        value: {
            url: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
        },
    },
    render: (props) => {
        const [value, setValue] = useState<IInputFileAvatarValue | undefined>(props.value);

        return <InputFileAvatar {...props} value={value} onChange={setValue} />;
    },
};

export default meta;
