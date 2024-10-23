import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { DataList, Link, Tag } from '../../../../../core';
import { addressUtils } from '../../../../utils/addressUtils';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ApprovalThresholdResult } from '../approvalThresholdResult';
import { MajorityVotingResult } from '../majorityVotingResult';
import { ProposalDataListItemStatus } from '../proposalDataListItemStatus';
import { proposalDataListItemUtils } from '../proposalDataListItemUtils';
import { type IProposalDataListItemStructureProps, type IPublisher } from './proposalDataListItemStructure.api';

export const maxPublishersDisplayed = 3;

const parsePublisher = (publisher: IPublisher, isConnected: boolean, connectedAddress: string | undefined) => {
    const publisherIsConnected = isConnected && addressUtils.isAddressEqual(publisher.address, connectedAddress);
    const publisherLabel = publisherIsConnected
        ? 'You'
        : (publisher.name ?? addressUtils.truncateAddress(publisher.address));

    return { label: publisherLabel, link: publisher.link };
};

export const ProposalDataListItemStructure: React.FC<IProposalDataListItemStructureProps> = (props) => {
    const {
        wagmiConfig: config,
        chainId,
        id,
        className,
        type,
        result,
        date,
        tag,
        publisher,
        status,
        summary,
        title,
        voted,
        children,
        ...otherProps
    } = props;

    const { address: connectedAddress, isConnected } = useAccount({ config });
    const { copy } = useGukModulesContext();

    const isOngoing = proposalDataListItemUtils.isOngoingStatus(status);

    const parsedPublisher = Array.isArray(publisher)
        ? publisher.map((p) => parsePublisher(p, isConnected, connectedAddress))
        : [parsePublisher(publisher, isConnected, connectedAddress)];

    const showParsedPublisher = parsedPublisher.length <= maxPublishersDisplayed;

    return (
        <DataList.Item className={classNames('flex flex-col gap-y-4', className)} {...otherProps}>
            <ProposalDataListItemStatus date={date} status={status} voted={voted} />
            <div className="flex flex-col gap-y-1">
                <p className="flex gap-x-3 text-lg leading-tight md:text-2xl">
                    {id && <span className="shrink-0 text-neutral-500">{id}</span>}
                    <span className="line-clamp-1 text-neutral-800">{title}</span>
                </p>
                <p className="line-clamp-2 leading-normal text-neutral-500 md:text-lg">{summary}</p>
            </div>

            {isOngoing && type === 'approvalThreshold' && result && <ApprovalThresholdResult {...result} />}

            {isOngoing && type === 'majorityVoting' && result && <MajorityVotingResult {...result} />}

            {children}

            <div className="flex items-center justify-between gap-x-4 md:gap-x-6">
                <div
                    className={classNames(
                        'inline-grid auto-cols-auto grid-flow-col content-center',
                        'min-h-5 gap-x-0.5 text-sm leading-tight text-neutral-600 md:min-h-6 md:gap-x-1 md:text-base',
                    )}
                >
                    {copy.proposalDataListItemStructure.by}
                    {showParsedPublisher === false && (
                        <span>
                            {maxPublishersDisplayed}+ {copy.proposalDataListItemStructure.creators}
                        </span>
                    )}
                    {showParsedPublisher &&
                        parsedPublisher.map(({ label, link }, index) => (
                            <span key={label} className="truncate">
                                <object type="disregardType" className="flex shrink">
                                    {link != null && (
                                        // using solution from https://kizu.dev/nested-links/ to nest anchor tags
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
