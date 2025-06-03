import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Checkbox, type CheckboxState } from './checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Core/Components/Forms/Checkbox',
    component: Checkbox,
    argTypes: {
        disabled: { type: 'boolean' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8322-22460&mode=design&t=l7HfAdX7WAtBtHYX-4',
        },
    },
};

type Story = StoryObj<typeof Checkbox>;

/**
 * Default uncontrolled usage of the Checkbox component.
 */
export const Default: Story = {
    args: { label: 'Default' },
};

/**
 * Usage of a controlled Checkbox component.
 */
export const Controlled: Story = {
    render: (props) => {
        const [checked, setChecked] = useState<CheckboxState>(false);

        return <Checkbox checked={checked} onCheckedChange={setChecked} {...props} />;
    },
    args: { label: 'Controlled' },
};

const IndeterminateComponent = () => {
    const [parentChecked, setParentChecked] = useState<CheckboxState>(false);
    const [childChecked, setChildChecked] = useState<CheckboxState[]>(Array(5).fill(false));

    const handleParentCheckedChange = (state: CheckboxState) => {
        setParentChecked(state);
        setChildChecked(Array(5).fill(state));
    };

    const handleChildCheckedChange = (index: number) => (state: CheckboxState) => {
        const newChildChecked = [...childChecked];
        newChildChecked[index] = state;
        setChildChecked(newChildChecked);
    };

    useEffect(() => {
        const allChecked = childChecked.every((checked) => checked);
        const someChecked = childChecked.some((checked) => checked);
        setParentChecked(allChecked ? true : someChecked ? 'indeterminate' : false);
    }, [childChecked]);

    return (
        <div className="flex flex-col gap-2">
            <Checkbox label="Parent checkbox" checked={parentChecked} onCheckedChange={handleParentCheckedChange} />
            {childChecked.map((isChecked, index) => (
                <Checkbox
                    key={index}
                    label={`Child checkbox ${(index + 1).toString()}`}
                    checked={isChecked}
                    onCheckedChange={handleChildCheckedChange(index)}
                    className="ml-4"
                />
            ))}
        </div>
    );
};

/**
 * The Checkbox component handles an indeterminate state when the checked property is set to "indeterminate". This state
 * can be used, for instance, to handle a "parent" checkbox with two or more "child" checkboxes.
 */
export const IndeterminateState: Story = {
    render: () => <IndeterminateComponent />,
};

export default meta;
