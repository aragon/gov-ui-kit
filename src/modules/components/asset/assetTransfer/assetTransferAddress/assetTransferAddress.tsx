import classNames from 'classnames';
import { Icon, IconType, LinkBase } from '../../../../../core';
import { type ICompositeAddress } from '../../../../types';
import { addressUtils } from '../../../../utils';
import { MemberAvatar } from '../../../member';

export type TxRole = 'sender' | 'recipient';

export interface IAssetTransferAddressProps {
    /**
     * Role of the transaction participant.
     */
    txRole: TxRole;
    /**
     * Participant of the transfer to display the details for.
     */
    participant: ICompositeAddress;
    /**
     * URL of the block explorer.
     */
    addressUrl?: string;
}

export const AssetTransferAddress: React.FC<IAssetTransferAddressProps> = (props) => {
    const { participant, addressUrl, txRole } = props;

    const resolvedUserHandle =
        participant.name != null && participant.name.length > 0
            ? participant.name
            : addressUtils.truncateAddress(participant.address);

    return (
        <LinkBase
            href={addressUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
                'group flex h-20 items-center space-x-4 border-neutral-100 px-4', //base
                'hover:border-neutral-200 hover:shadow-neutral-md', //hover
                'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', //focus
                'active:border-neutral-300 active:shadow-none', //active
                'md:w-1/2 md:p-6', //responsive
                {
                    'rounded-t-xl md:rounded-l-xl md:rounded-r-none': txRole === 'sender', // sender base
                    'rounded-b-xl md:rounded-l-none md:rounded-r-xl md:pl-8': txRole === 'recipient', // recipient base
                },
                {
                    'border-x border-t md:border-y md:border-l md:border-r-0': txRole === 'sender', // sender borders
                    'border-x border-b md:border-y md:border-l-0 md:border-r': txRole === 'recipient', // recipient borders
                },
                {
                    'focus-visible:rounded-t-xl md:focus-visible:rounded-l-xl md:focus-visible:rounded-r-none':
                        txRole === 'sender', // sender focus
                    'focus-visible:rounded-b-xl md:focus-visible:rounded-l-none md:focus-visible:rounded-r-xl':
                        txRole === 'recipient', // recipient focus
                },
            )}
        >
            <MemberAvatar
                className="group-hover:shadow-neutral-md group-active:shadow-none"
                responsiveSize={{ md: 'md' }}
                ensName={participant.name}
                address={participant.address}
                avatarSrc={participant.avatarSrc}
            />
            <div className="flex min-w-0 flex-col">
                <span className="text-xs font-normal leading-tight text-neutral-500 md:text-sm">
                    {txRole === 'sender' ? 'From' : 'To'}
                </span>
                <div className="flex items-center space-x-1">
                    <span className="truncate text-sm font-normal leading-tight text-neutral-800 md:text-base">
                        {resolvedUserHandle}
                    </span>
                    <Icon
                        icon={IconType.LINK_EXTERNAL}
                        size="sm"
                        className="float-right text-neutral-300 group-hover:text-primary-300 group-active:text-primary-400"
                    />
                </div>
            </div>
        </LinkBase>
    );
};
