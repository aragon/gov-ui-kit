import type { Meta, StoryObj } from '@storybook/react';
import { DaoDataListItemStructure } from './daoDataListItemStructure';

const meta: Meta<typeof DaoDataListItemStructure> = {
    title: 'Modules/Components/Dao/DaoDataListItem/DaoDataListItem.Structure',
    component: DaoDataListItemStructure,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=3259-11363&mode=dev',
        },
    },
};

type Story = StoryObj<typeof DaoDataListItemStructure>;

/**
 * Default usage example of the DaoDataListItem component.
 */
export const Default: Story = {
    args: {
        name: 'Patito DAO',
        logoSrc: 'https://cdn.discordapp.com/icons/672466989217873929/acffa3e9e09ac5962ff803a5f8649040.webp?size=240',
        description:
            'Papito DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.',
        network: 'Ethereum Mainnet',
        ens: 'patito.dao.eth',
    },
};

/* Usage with extra long strings for name & ENS */
export const LongNames: Story = {
    args: {
        name: 'A DAO With An Extremely Long Name That Should Be Truncated DAO',
        logoSrc: 'https://cdn.discordapp.com/icons/672466989217873929/acffa3e9e09ac5962ff803a5f8649040.webp?size=240',
        description:
            'Papito DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.',
        network: 'Ethereum Mainnet',
        ens: 'a_dao_with_an_extremely_long_ens_name_that_should_be_truncated.dao.eth',
    },
};

/**
 *  Usage of the DaoDataListItem without an image src.
 */
export const Fallback: Story = {
    args: {
        name: 'Patito DAO',
        description:
            'Papito DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.',
        network: 'Ethereum Mainnet',
        ens: 'patito.dao.eth',
    },
};

export default meta;
