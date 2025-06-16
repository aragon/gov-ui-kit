import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../checkbox';
import { CheckboxCard } from '../checkboxCard';
import { CheckboxGroup } from './checkboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
    title: 'Core/Components/Forms/CheckboxGroup',
    component: CheckboxGroup,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8322-22460&mode=design&t=l7HfAdX7WAtBtHYX-4',
        },
    },
};

type Story = StoryObj<typeof CheckboxGroup>;

/**
 * Default usage of the CheckboxGroup component.
 */
export const Default: Story = {
    render: (props) => (
        <CheckboxGroup {...props}>
            <Checkbox label="First" />
            <Checkbox label="Second" />
            <Checkbox label="Third" />
        </CheckboxGroup>
    ),
};

/**
 * Usage of the CheckboxGroup component with CheckboxCard variant.
 */
export const CheckboxCardVariant: Story = {
    render: (props) => (
        <CheckboxGroup {...props}>
            <CheckboxCard
                label="First label"
                description="First description"
                avatar="first"
                tag={{ label: 'First', variant: 'info' }}
            />
            <CheckboxCard
                label="Second label"
                description="Longer description for second checkbox"
                avatar="second"
                tag={{ label: 'Second', variant: 'warning' }}
            />
            <CheckboxCard
                label="Third label"
                description="First description"
                avatar="third"
                tag={{ label: 'First', variant: 'primary' }}
            />
        </CheckboxGroup>
    ),
};

export default meta;
