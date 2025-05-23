import type { Meta, StoryObj } from '@storybook/react';
import { Rolodex } from './rolodex';

const meta: Meta<typeof Rolodex> = {
    title: 'Modules/Components/Rolodex/Rolodex',
    component: Rolodex,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Governance-UI-Kit?type=design&node-id=14385%3A24287&mode=dev&t=IX3Fa96hiwUEtcoA-1',
        },
    },
};

type Story = StoryObj<typeof Rolodex>;

/**
 * Default usage example of the MemberAvatar component.
 */
export const Default: Story = {};

export default meta;
