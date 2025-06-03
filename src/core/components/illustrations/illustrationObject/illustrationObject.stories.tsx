import type { Meta, StoryObj } from '@storybook/react-webpack5';
import style from '../index.css?raw';
import { IllustrationObject } from './illustrationObject';

const meta: Meta<typeof IllustrationObject> = {
    title: 'Core/Components/Illustrations/IllustrationObject',
    component: IllustrationObject,
    parameters: {
        style,
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8874-14443&mode=dev',
        },
    },
};

type Story = StoryObj<typeof IllustrationObject>;

/**
 * Default usage example of the IllustrationObject component.
 */
export const Default: Story = {
    args: {
        object: 'ACTION',
    },
};

export default meta;
