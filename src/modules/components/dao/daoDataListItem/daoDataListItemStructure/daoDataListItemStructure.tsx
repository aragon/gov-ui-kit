import type React from 'react';
import { AvatarIcon, DataList, Heading, Icon, IconType, type IDataListItemProps } from '../../../../../core';
import { addressUtils } from '../../../../utils';
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
     * The network on which the DAO operates.
     */
    network?: string;
    /**
     * Displays an external link icon and updates the information shown when set to true.
     */
    isExternal?: boolean;
};

export const DaoDataListItemStructure: React.FC<IDaoDataListItemStructureProps> = (props) => {
    const { name, logoSrc, description, network, address, ens, isExternal, ...otherProps } = props;

    const truncatedAddress = addressUtils.truncateAddress(address);
    const addressLine = ens ?? truncatedAddress;

    return (
        <DataList.Item className="grid gap-y-3 py-4 md:gap-y-4 md:py-6" {...otherProps}>
            <div className="flex w-full justify-between gap-2">
                <div className="grid shrink items-center gap-y-1.5 text-neutral-800">
                    <Heading as="h2" className="truncate" size="h3">
                        {name}
                    </Heading>
                    {!!addressLine && (
                        <Heading as="h3" className="truncate" size="h5">
                            {addressLine}
                        </Heading>
                    )}
                </div>
                <DaoAvatar name={name} responsiveSize={{ md: 'lg' }} size="md" src={logoSrc} />
            </div>
            <p className="line-clamp-2 text-base text-neutral-500 leading-normal md:text-lg">{description}</p>
            <div className="flex flex-row justify-between">
                <div className="mt-1 flex items-center gap-x-1 text-neutral-400 md:mt-0 md:gap-x-2">
                    <span className="text-sm capitalize leading-tight md:text-base">{network}</span>
                    <Icon icon={IconType.BLOCKCHAIN_BLOCKCHAIN} responsiveSize={{ md: 'md' }} size="sm" />
                </div>
                {isExternal && <AvatarIcon icon={IconType.LINK_EXTERNAL} size="sm" variant="primary" />}
            </div>
        </DataList.Item>
    );
};
