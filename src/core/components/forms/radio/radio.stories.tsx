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

export default meta;
