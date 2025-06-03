import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Toggle } from '../toggle';
import { ToggleGroup, type IToggleGroupProps } from './toggleGroup';

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
            <Toggle value="multisig" label="Multisig" />
            <Toggle value="token-based" label="Token Based" />
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
            <Toggle value="default" label="Default" />
            <Toggle value="optimistic" label="Optimistic" />
            <Toggle value="timelock" label="Timelock" />
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
            <ToggleGroup isMultiSelect={false} value={value} onChange={setValue} {...props}>
                <Toggle value="ethereum" label="Ethereum" />
                <Toggle value="polygon" label="Polygon" />
                <Toggle value="base" label="Base" />
                <Toggle value="arbitrum" label="Arbitrum" />
                <Toggle value="bsc" label="Binance Smart Chain" />
            </ToggleGroup>
        );
    },
};

const MultiSelectComponent = (
    props: Omit<IToggleGroupProps, 'value' | 'defaultValue' | 'onChange' | 'isMultiSelect'>,
) => {
    const [value, setValue] = useState<string[]>();

    return (
        <ToggleGroup isMultiSelect={true} value={value} onChange={setValue} {...props}>
            <Toggle value="all" label="All DAOs" />
            <Toggle value="member" label="Member" />
            <Toggle value="following" label="Following" disabled={true} />
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
