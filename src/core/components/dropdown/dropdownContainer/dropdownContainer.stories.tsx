import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dropdown, type IDropdownContainerProps } from '../index';
import style from './index.css?raw';

const meta: Meta<typeof Dropdown.Container> = {
    title: 'Core/Components/Dropdown/Dropdown.Container',
    component: Dropdown.Container,
    parameters: {
        style,
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8097-22574&mode=design&t=4o7W5TmAScRx38xw-4',
        },
    },
};

type Story = StoryObj<typeof Dropdown.Container>;

/**
 * Default usage of the DropdownContainer component.
 */
export const Default: Story = {
    render: (props: IDropdownContainerProps) => (
        <Dropdown.Container {...props}>
            <Dropdown.Item>First item</Dropdown.Item>
            <Dropdown.Item>Second item</Dropdown.Item>
            <Dropdown.Item>Third item with a longer label</Dropdown.Item>
        </Dropdown.Container>
    ),
    args: {
        label: 'Dropdown',
    },
};

export const OnlyIcon: Story = {
    render: (props: IDropdownContainerProps) => (
        <Dropdown.Container {...props}>
            <Dropdown.Item>Only icon item</Dropdown.Item>
        </Dropdown.Container>
    ),
};

/**
 * Controlled usage of the DropdownContainer component.
 */
export const Controlled: Story = {
    render: (props) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <Dropdown.Container open={isOpen} onOpenChange={setIsOpen} {...props}>
                <Dropdown.Item>Controlled item</Dropdown.Item>
            </Dropdown.Container>
        );
    },
    args: {
        label: 'Controlled dropdown',
    },
};

/**
 * Usage of the DropdownContainer component with a max width for the dropdown items.
 */
export const WithMaxWidth: Story = {
    render: (props: IDropdownContainerProps) => (
        <Dropdown.Container {...props} label="Max width" constrainContentWidth={false} contentClassNames="max-w-52">
            <Dropdown.Item>
                A vert long description for the dropdown item that will eventualy be truncated
            </Dropdown.Item>
        </Dropdown.Container>
    ),
};

const SelectionComponent = (props: IDropdownContainerProps) => {
    const items = [
        { id: 'all-daos', label: 'All DAOs' },
        { id: 'members', label: 'Member of' },
        { id: 'favourites', label: 'Favourites' },
    ];

    const [selectedItem, setSelectedItem] = useState(items[0].id);

    return (
        <Dropdown.Container {...props}>
            {items.map(({ id, label }) => (
                <Dropdown.Item key={id} selected={selectedItem === id} onSelect={() => setSelectedItem(id)}>
                    {label}
                </Dropdown.Item>
            ))}
        </Dropdown.Container>
    );
};

/**
 * Use the `selected` and `onSelect` properties of the <Dropdown.Item /> component to implement a selection dropdown.
 */
export const Selection: Story = {
    render: (props: IDropdownContainerProps) => <SelectionComponent {...props} />,
    args: {
        label: 'Selection dropdown',
    },
};

export default meta;
