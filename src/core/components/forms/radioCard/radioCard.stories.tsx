import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from '../radioGroup';
import { RadioCard } from './radioCard';

const meta: Meta<typeof RadioCard> = {
    title: 'Core/Components/Forms/RadioCard',
    component: RadioCard,
    argTypes: {
        disabled: { control: 'boolean' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Governance-UI-Kit?type=design&node-id=10095-19157&mode=design&t=FsK7MCOZgi86zSuS-0',
        },
    },
};

type Story = StoryObj<typeof RadioCard>;

/**
 * Default usage of the `RadioCard` component
 */
export const Default: Story = {
    render: (props) => (
        <RadioGroup>
            <RadioCard {...props} />
        </RadioGroup>
    ),
    args: {
        avatar: 'https://assets-global.website-files.com/5e997428d0f2eb13a90aec8c/63f47db62df04b569e4e004e_icon_aragon.svg',
        value: '1',
        label: 'Option one',
        tag: { label: 'Platinum' },
    },
};

/**
 * Default usage of the `RadioCard` component with description
 */
export const WithDescription: Story = {
    render: (props) => (
        <RadioGroup>
            <RadioCard {...props} />
        </RadioGroup>
    ),
    args: {
        avatar: 'https://assets-global.website-files.com/5e997428d0f2eb13a90aec8c/63f47db62df04b569e4e004e_icon_aragon.svg',
        value: '1',
        label: 'Option one',
        description: 'The best option ever',
        tag: { label: 'Platinum' },
    },
};

/**
 * Usage of the `RadioCard` component with children when selected
 */
export const WithChildrenWhenSelected: Story = {
    render: (props) => (
        <RadioGroup>
            <RadioCard {...props} />
        </RadioGroup>
    ),
    args: {
        avatar: 'https://assets-global.website-files.com/5e997428d0f2eb13a90aec8c/63f47db62df04b569e4e004e_icon_aragon.svg',
        value: '1',
        label: 'Option one',
        description: 'The best option ever',
        tag: { label: 'Platinum' },
        children: <div>Children</div>,
    },
};

export default meta;
