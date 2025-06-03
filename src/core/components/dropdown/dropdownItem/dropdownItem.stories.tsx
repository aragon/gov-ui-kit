import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dropdown, type IDropdownItemProps } from '../index';

const meta: Meta<typeof Dropdown.Item> = {
    title: 'Core/Components/Dropdown/Dropdown.Item',
    component: Dropdown.Item,
    argTypes: {
        disabled: { control: 'boolean' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8072-35701&mode=design&t=6F2nZrphVItFNxRc-4',
        },
    },
};

type Story = StoryObj<typeof Dropdown.Item>;

/**
 * Default usage of the DropdownItem component.
 */
export const Default: Story = {
    render: (props: IDropdownItemProps) => (
        <Dropdown.Container label="Dropdown">
            <Dropdown.Item {...props} />
        </Dropdown.Container>
    ),
    args: {
        children: 'Dropdown item label',
    },
};

/**
 * Set the `href` property to the DropdownItem component to render a link item.
 */
export const Link: Story = {
    render: (props: IDropdownItemProps) => (
        <Dropdown.Container label="Dropdown with link">
            <Dropdown.Item {...props} />
        </Dropdown.Container>
    ),
    args: {
        children: 'Dropdown link',
        href: 'https://aragon.org',
        target: '_blank',
    },
};

export default meta;
