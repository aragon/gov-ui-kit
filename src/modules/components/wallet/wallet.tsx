import classNames from 'classnames';
import { useEnsName } from 'wagmi';
import { StateSkeletonBar } from '../../../core';
import { type ICompositeAddress, type IWeb3ComponentProps } from '../../types';
import { addressUtils } from '../../utils';
import { useGukModulesContext } from '../gukModulesProvider';
import { MemberAvatar } from '../member';

export interface IWalletProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, IWeb3ComponentProps {
    /**
     * The connected user details.
     */
    user?: ICompositeAddress;
}

export const Wallet: React.FC<IWalletProps> = (props) => {
    const { user, className, chainId, wagmiConfig, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const { data: ensName, isLoading: isEnsLoading } = useEnsName({
        address: user != null ? addressUtils.getChecksum(user.address) : undefined,
        query: { enabled: user != null && user.name == null },
        chainId,
        config: wagmiConfig,
    });
    const resolvedUserHandle = user?.name ?? ensName ?? addressUtils.truncateAddress(user?.address);

    const buttonClassName = classNames(
        'flex items-center gap-3 rounded-full border border-neutral-100 bg-neutral-0 text-neutral-500 transition-all',
        'hover:border-neutral-200 active:bg-neutral-50 active:text-neutral-800',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
        { 'px-4 py-2.5': user == null },
        { 'p-1 md:pl-4': user != null },
        className,
    );

    return (
        <button className={buttonClassName} {...otherProps}>
            {!user && copy.wallet.connect}
            {user && isEnsLoading && <StateSkeletonBar className="hidden md:block" size="lg" width={56} />}
            {user && !isEnsLoading && (
                <span title={user.name ?? ensName ?? user.address} className="hidden max-w-24 truncate md:block">
                    {resolvedUserHandle}
                </span>
            )}
            {user && (
                <MemberAvatar
                    size="lg"
                    ensName={user.name}
                    address={user.address}
                    avatarSrc={user.avatarSrc}
                    chainId={chainId}
                    wagmiConfig={wagmiConfig}
                />
            )}
        </button>
    );
};
