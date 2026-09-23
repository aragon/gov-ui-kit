import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from '../radioGroup';
import { Radio } from './radio';

const meta: Meta<typeof Radio> = {
    title: 'Core/Components/Forms/Radio',
    component: Radio,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=9778-14&mode=dev',
        },
    },
};

type Story = StoryObj<typeof Radio>;

/**
 * Default usage of the `Radio` component
 */
export const Default: Story = {
    render: (props) => (
        <RadioGroup name="bob">
            <Radio {...props} />
        </RadioGroup>
    ),
    args: {
        value: '1',
        label: 'Number one',
        disabled: false,
    },
};

/**
 * A disabled radio stays visible as an option but cannot be selected. Disable the
 * individual `Radio`, not the `RadioGroup`, to rule out one choice while the rest
 * stay selectable.
 */
export const Disabled: Story = {
    render: (props) => (
        <RadioGroup name="disabled-example">
            <Radio label="Token voting" value="token" />
            <Radio {...props} />
        </RadioGroup>
    ),
    args: {
        value: 'multisig',
        label: 'Multisig (needs at least one member)',
        disabled: true,
    },
};

export default meta;
