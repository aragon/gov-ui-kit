import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Tag } from './tag';

const meta: Meta<typeof Tag> = {
    title: 'Core/Components/Tag',
    component: Tag,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=21-200&mode=design&t=9F9GGTyrap4TVsvP-4',
        },
    },
};

type Story = StoryObj<typeof Tag>;

/**
 * Default usage example of the Tag component.
 */
export const Default: Story = {
    args: {
        label: 'Label',
    },
};

export default meta;
