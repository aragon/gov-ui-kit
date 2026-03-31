import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Radio } from '../radio';
import { RadioCard } from '../radioCard';
import { RadioGroup } from './radioGroup';

const meta: Meta<typeof RadioGroup> = {
    title: 'Core/Components/Forms/RadioGroup',
    component: RadioGroup,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8322-22482&mode=design&t=HyaiVyRmOAeVa91z-4',
        },
    },
};

type Story = StoryObj<typeof RadioGroup>;

/**
 * Default usage of the `RadioGroup` component
 */
export const Default: Story = {
    render: (props) => (
        <RadioGroup {...props}>
            <Radio label="Option one" value="1" />
            <Radio label="Option two" value="2" />
            <Radio label="Option three" value="3" />
        </RadioGroup>
    ),
    args: {
        defaultValue: '2',
        name: 'Options',
        disabled: false,
        onValueChange: undefined,
    },
};

/**
 * Default usage of the `RadioGroup` component with the RadioCard
 */
export const RadioCardVariant: Story = {
    render: (props) => (
        <RadioGroup {...props}>
            <RadioCard
                avatar="gold"
                description="The best option"
                label="Option one"
                tag={{ label: 'Gold', variant: 'success' }}
                value="1"
            />
            <RadioCard
                avatar="silver"
                description="The 2nd best option"
                label="Option two"
                tag={{ label: 'Silver' }}
                value="2"
            />
            <RadioCard
                avatar="bronze"
                description="The 3rd best option"
                label="Option three"
                tag={{ label: 'Bronze', variant: 'warning' }}
                value="3"
            />
        </RadioGroup>
    ),
    args: {
        defaultValue: '2',
        name: 'Options',
        disabled: false,
        onValueChange: undefined,
    },
};

/**
 * Usage example of a controlled `RadioGroup` component.
 */
export const Controlled: Story = {
    render: (props) => {
        const [value, setValue] = useState('1');
        return (
            <RadioGroup {...props} onValueChange={setValue} value={value}>
                <Radio label="Option one" value="1" />
                <Radio label="Option two" value="2" />
                <Radio label="Option three" value="3" />
            </RadioGroup>
        );
    },
    args: {
        name: 'Options',
        value: '1',
        disabled: false,
    },
};

export default meta;
