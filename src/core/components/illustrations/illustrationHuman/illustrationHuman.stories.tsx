import type { Meta, StoryObj } from '@storybook/react-webpack5';
import style from '../index.css?raw';
import { IllustrationHuman } from './illustrationHuman';

const meta: Meta<typeof IllustrationHuman> = {
    title: 'Core/Components/Illustrations/IllustrationHuman',
    component: IllustrationHuman,
    parameters: {
        style,
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8874-14281&mode=dev',
        },
    },
};

type Story = StoryObj<typeof IllustrationHuman>;

/**
 * Default usage example of the IllustrationObject component.
 */
export const Default: Story = {
    args: {
        body: 'ARAGON',
        expression: 'SMILE_WINK',
    },
};

export default meta;
