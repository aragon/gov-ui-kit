import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';
import { IconType } from './iconType';

const meta: Meta<typeof Icon> = {
    title: 'Core/Components/Icon',
    component: Icon,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=8842-13139',
        },
    },
};

type Story = StoryObj<typeof Icon>;

/**
 * Default usage example of the Icon component.
 */
export const Default: Story = {
    args: {
        icon: IconType.PLUS,
    },
};

/**
 * All available icons of the GovKit library.
 */
export const AvailableIcons: Story = {
    render: () => {
        return (
            <div className="flex flex-row flex-wrap gap-5">
                {Object.keys(IconType).map((iconType) => (
                    <div key={iconType} title={iconType}>
                        <Icon icon={iconType as IconType} size="lg" />
                    </div>
                ))}
            </div>
        );
    },
};

export default meta;
