import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { DataList, Heading, Link, Tag } from '../../../../../core';
import { addressUtils } from '../../../../utils/addressUtils';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalDataListItemStatus } from '../proposalDataListItemStatus';
import { type IProposalDataListItemStructureProps, type IPublisher } from './proposalDataListItemStructure.api';

export const maxPublishersDisplayed = 3;

const parsePublisher = (
    publisher: IPublisher,
    canShowConnectedLabel: boolean,
    isConnected: boolean,
    connectedAddress: string | undefined,
) => {
    const publisherIsConnected =
        canShowConnectedLabel && isConnected && addressUtils.isAddressEqual(publisher.address, connectedAddress);
    const publisherLabel = publisherIsConnected
        ? 'You'
        : (publisher.name ?? addressUtils.truncateAddress(publisher.address));

    return { label: publisherLabel, link: publisher.link, address: publisher.address };
};

export const ProposalDataListItemStructure: React.FC<IProposalDataListItemStructureProps> = (props) => {
    const {
        wagmiConfig: config,
        id,
        className,
        date,
        tag,
        publisher,
        status,
        statusContext,
        summary,
        title,
        voted,
        children,
        ...otherProps
    } = props;

    const { address: connectedAddress, isConnected } = useAccount({ config });
    const { copy } = useGukModulesContext();

    // Avoid SSR/CSR hydration mismatches: the connected address is only known on
    // the client, so we only render the "You" label after mount.
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => setHasMounted(true), []);

    const parsedPublisher = useMemo(() => {
        return Array.isArray(publisher)
            ? publisher.map((p) => parsePublisher(p, hasMounted, isConnected, connectedAddress))
            : [parsePublisher(publisher, hasMounted, isConnected, connectedAddress)];
    }, [publisher, hasMounted, isConnected, connectedAddress]);

    const showParsedPublisher = parsedPublisher.length <= maxPublishersDisplayed;

    return (
        <DataList.Item
            className={classNames('flex flex-col gap-y-4 py-4 md:gap-y-4 md:py-6', className)}
            {...otherProps}
        >
            <ProposalDataListItemStatus date={date} status={status} voted={voted} statusContext={statusContext} />
            <div className="flex flex-col gap-y-1">
                <Heading size="h3" as="h2" className="flex gap-x-2 md:gap-x-3">
                    {id && <span className="shrink-0 text-neutral-500">{id}</span>}
                    <span className="line-clamp-1 text-neutral-800">{title}</span>
                </Heading>
                <p className="line-clamp-2 leading-normal text-neutral-500 md:text-lg">{summary}</p>
            </div>
            {children}
            <div className="flex items-center justify-between gap-x-4 md:gap-x-6">
                <div
                    className={classNames(
                        'inline-grid auto-cols-auto grid-flow-col content-center',
                        'min-h-5 gap-x-0.5 text-sm leading-tight text-neutral-500 md:min-h-6 md:gap-x-1 md:text-base',
                    )}
                >
                    {copy.proposalDataListItemStructure.by}
                    {!showParsedPublisher && (
                        <span>
                            {maxPublishersDisplayed}+ {copy.proposalDataListItemStructure.creators}
                        </span>
                    )}
                    {showParsedPublisher &&
                        parsedPublisher.map(({ address, label, link }, index) => (
                            <span key={`${address}-${index.toString()}`} className="truncate">
                                <object type="unknown" className="flex shrink">
                                    {link != null && (
                                        // Using solution from https://kizu.dev/nested-links/ to nest anchor tags
                                        <Link href={link}>{label}</Link>
                                    )}
                                    {link == null && <span className="truncate">{label}</span>}
                                    {index < parsedPublisher.length - 1 && ','}
                                </object>
                            </span>
                        ))}
                </div>
                {tag && <Tag label={tag} variant="primary" />}
            </div>
        </DataList.Item>
    );
};
