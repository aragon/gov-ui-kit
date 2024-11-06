import type React from 'react';
import { DataList, Heading, Icon, IconType, type IDataListItemProps } from '../../../../../core';
import { DaoAvatar } from '../../daoAvatar';

export type IDaoDataListItemStructureProps = IDataListItemProps & {
    /**
     * The name of the DAO.
     */
    name?: string;
    /**
     * The source of the logo for the DAO.
     */
    logoSrc?: string;
    /**
     * The description of the DAO.
     */
    description?: string;
    /**
     * The address of the DAO.
     */
    address?: string;
    /**
     * The ENS (Ethereum Name Service) address of the DAO.
     */
    ens?: string;
    /**
     * The plugin used by the DAO.
     * @default token-based
     */
    plugin?: string;
    /**
     * The network on which the DAO operates.
     */
    network?: string;
};

export const DaoDataListItemStructure: React.FC<IDaoDataListItemStructureProps> = (props) => {
    const { name, logoSrc, description, network, plugin = 'token-based', address, ens, ...otherProps } = props;

    return (
        <DataList.Item {...otherProps}>
            <div className="grid gap-y-3 py-4 md:gap-y-4 md:py-6">
                <div className="flex w-full justify-between gap-2">
                    <div className="grid shrink gap-y-1.5 text-neutral-800">
                        <Heading size="h3" as="h2" className="truncate">
                            {name}
                        </Heading>
                        <Heading size="h5" as="h3" className="truncate">
                            {ens ?? address}
                        </Heading>
                    </div>
                    <DaoAvatar name={name} src={logoSrc} size="md" responsiveSize={{ md: 'lg' }} />
                </div>
                <p className="line-clamp-2 text-base font-normal leading-normal text-neutral-500 md:text-lg">
                    {description}
                </p>
                <div className="flex space-x-6 text-neutral-400 md:space-x-8">
                    <div className="flex items-center gap-2 text-sm md:text-base">
                        <span className="capitalize">{network}</span>
                        <Icon icon={IconType.BLOCKCHAIN_BLOCKCHAIN} />
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
