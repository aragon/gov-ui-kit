import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Toggle } from '../toggle';
import { type IToggleGroupProps, ToggleGroup } from './toggleGroup';

const meta: Meta<typeof ToggleGroup> = {
    title: 'Core/Components/Toggles/ToggleGroup',
    component: ToggleGroup,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=11857-23553&mode=dev',
        },
    },
};

type Story = StoryObj<typeof ToggleGroup>;

/**
 * Default usage example of the ToggleGroup component.
 */
export const Default: Story = {
    render: (props) => (
        <ToggleGroup {...props}>
            <Toggle label="Multisig" value="multisig" />
            <Toggle label="Token Based" value="token-based" />
        </ToggleGroup>
    ),
};

/**
 * Usage of the ToggleGroup component with space-between variant.
 */
export const SpaceBetween: Story = {
    args: { variant: 'space-between' },
    render: (props) => (
        <ToggleGroup className="w-full" {...props}>
            <Toggle label="Default" value="default" />
            <Toggle label="Optimistic" value="optimistic" />
            <Toggle label="Timelock" value="timelock" />
        </ToggleGroup>
    ),
};

/**
 * Usage of the ToggleGroup component with many toggles showing wrapped behavior.
 */
export const Wrapped: Story = {
    render: (props) => (
        <ToggleGroup className="w-full" {...props}>
            <Toggle label="Default" value="default" />
            <Toggle label="Optimistic" value="optimistic" />
            <Toggle label="Timelock" value="timelock" />
            <Toggle label="Active" value="active" />
            <Toggle label="Inactive" value="inactive" />
            <Toggle label="Pending" value="pending" />
            <Toggle label="Red" value="red" />
            <Toggle label="Blue" value="blue" />
            <Toggle label="Green" value="green" />
            <Toggle label="Circle" value="circle" />
            <Toggle label="Square" value="square" />
            <Toggle label="Triangle" value="triangle" />
            <Toggle label="Desktop" value="desktop" />
            <Toggle label="Tablet" value="tablet" />
            <Toggle label="Mobile" value="mobile" />
            <Toggle label="Car" value="car" />
            <Toggle label="Train" value="train" />
            <Toggle label="Bike" value="bike" />
        </ToggleGroup>
    ),
};

/**
 * Controlled usage example of the ToggleGroup component.
 */
export const Controlled: Story = {
    render: ({ value: omittedValue, defaultValue, onChange, isMultiSelect, ...props }) => {
        const [value, setValue] = useState<string>();

        return (
            <ToggleGroup isMultiSelect={false} onChange={setValue} value={value} {...props}>
                <Toggle label="Ethereum" value="ethereum" />
                <Toggle label="Polygon" value="polygon" />
                <Toggle label="Base" value="base" />
                <Toggle label="Arbitrum" value="arbitrum" />
                <Toggle label="Binance Smart Chain" value="bsc" />
            </ToggleGroup>
        );
    },
};

const MultiSelectComponent = (
    props: Omit<IToggleGroupProps, 'value' | 'defaultValue' | 'onChange' | 'isMultiSelect'>,
) => {
    const [value, setValue] = useState<string[]>();

    return (
        <ToggleGroup isMultiSelect={true} onChange={setValue} value={value} {...props}>
            <Toggle label="All DAOs" value="all" />
            <Toggle label="Member" value="member" />
            <Toggle disabled={true} label="Following" value="following" />
        </ToggleGroup>
    );
};

/**
 * ToggleGroup component used with multiple selection.
 */
export const MultiSelect: Story = {
    render: ({ value, onChange, isMultiSelect, ...props }) => <MultiSelectComponent {...props} />,
};

export default meta;
