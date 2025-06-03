import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ToggleGroup } from '../toggleGroup';
import { Toggle, type IToggleProps } from './toggle';

const meta: Meta<typeof Toggle> = {
    title: 'Core/Components/Toggles/Toggle',
    component: Toggle,
    argTypes: {
        disabled: { control: 'boolean' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=9778-14&mode=dev',
        },
    },
};

type Story = StoryObj<typeof Toggle>;

/**
 * Default usage example of the Toggle component.
 */
export const Default: Story = {
    render: (props) => (
        <ToggleGroup isMultiSelect={false}>
            <Toggle {...props} />
        </ToggleGroup>
    ),
    args: {
        value: 'value',
        label: 'Label',
    },
};

const ControllerComponent = (props: IToggleProps) => {
    const [value, setValue] = useState<string>();

    return (
        <ToggleGroup isMultiSelect={false} value={value} onChange={setValue}>
            <Toggle {...props} />
        </ToggleGroup>
    );
};

/**
 * Controlled usage example of the Toggle component.
 */
export const Controlled: Story = {
    render: (props) => <ControllerComponent {...props} />,
    args: {
        value: 'value',
        label: 'Label',
    },
};

/**
 * Disabled Toggle component.
 */
export const Disabled: Story = {
    render: (props) => (
        <ToggleGroup isMultiSelect={false}>
            <Toggle {...props} />
        </ToggleGroup>
    ),
    args: {
        disabled: true,
        label: 'Disabled',
    },
};

export default meta;
