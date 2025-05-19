import classNames from 'classnames';
import { mainnet } from 'viem/chains';
import { useEnsName } from 'wagmi';
import { StateSkeletonBar } from '../../../core';
import { type ICompositeAddress, type IWeb3ComponentProps } from '../../types';
import { addressUtils } from '../../utils';
import { useGukModulesContext } from '../gukModulesProvider';
import { MemberAvatar } from '../member';

export type TextFromSize = 'md' | 'lg' | 'xl';

const showTextFromClasses: Record<TextFromSize, { padding: string; visibility: string }> = {
    md: { padding: 'md:pl-4', visibility: 'md:block' },
    lg: { padding: 'lg:pl-4', visibility: 'lg:block' },
    xl: { padding: 'xl:pl-4', visibility: 'xl:block' },
};

export interface IWalletProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, IWeb3ComponentProps {
    /**
     * The connected user details.
     */
    user?: ICompositeAddress;
    /**
     *
     */
    showTextFrom?: TextFromSize;
}

export const Wallet: React.FC<IWalletProps> = (props) => {
    const { user, showTextFrom = 'md', className, chainId = mainnet.id, wagmiConfig, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const { data: ensName, isLoading: isEnsLoading } = useEnsName({
        address: user != null ? addressUtils.getChecksum(user.address) : undefined,
        query: { enabled: user != null && user.name == null },
        chainId,
        config: wagmiConfig,
    });

    const resolvedUserHandle = user?.name ?? ensName ?? addressUtils.truncateAddress(user?.address);
    const resolvedUserTitle = user?.name ?? ensName ?? user?.address;

    const buttonClassName = classNames(
        'flex max-w-44 items-center gap-3 rounded-full border border-neutral-100 bg-neutral-0 text-neutral-500 transition-all',
        'hover:border-neutral-200 active:bg-neutral-50 active:text-neutral-800',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
        user == null ? 'px-4 py-2.5' : 'p-1',
        user ? showTextFromClasses[showTextFrom].padding : '',
        className,
    );

    const textBlockClass = classNames('hidden truncate', showTextFromClasses[showTextFrom].visibility);

    return (
        <button className={buttonClassName} {...otherProps}>
            {!user && copy.wallet.connect}
            {user && isEnsLoading && <StateSkeletonBar className={textBlockClass} size="lg" width={56} />}
            {user && !isEnsLoading && (
                <span title={resolvedUserTitle} className={textBlockClass}>
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
