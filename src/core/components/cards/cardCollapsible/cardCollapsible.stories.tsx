import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardCollapsible } from './cardCollapsible';

/**
 * CardCollapsible component that can wrap any content and visually collapse it for space-saving purposes.
 */
const meta: Meta<typeof CardCollapsible> = {
    title: 'Core/Components/Cards/CardCollapsible',
    component: CardCollapsible,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=10157-27011&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof CardCollapsible>;

/**
 * Default usage example of the CardCollapsible component.
 */
export const Default: Story = {
    args: { buttonLabelClosed: 'Read more', buttonLabelOpened: 'Read less' },
    render: (args) => (
        <CardCollapsible {...args}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien
                nec turpis tincidunt scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla
                nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec
                sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien nec turpis tincidunt
                scelerisque.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien
                nec turpis tincidunt scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla
                nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien
                nec turpis tincidunt scelerisque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla
                nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec
                sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien nec turpis tincidunt
                scelerisque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur
                tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam
                nec sapien nec turpis tincidunt scelerisque.
            </p>
        </CardCollapsible>
    ),
};

/**
 * CardCollapsible component with an image as the content.
 */
export const WithImage: Story = {
    args: {
        buttonLabelClosed: 'See more',
        buttonLabelOpened: 'See less',
    },
    render: (args) => (
        <CardCollapsible {...args}>
            <img src="https://source.unsplash.com/800x600/?landscape" alt="A beautiful landscape" />
        </CardCollapsible>
    ),
};

export default meta;
