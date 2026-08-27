import classNames from 'classnames';
import { useId } from 'react';
import { mainnet } from 'viem/chains';
import { useEnsName } from 'wagmi';
import { StateSkeletonBar } from '../../../core';
import type { ICompositeAddress, IWeb3ComponentProps } from '../../types';
import { addressUtils } from '../../utils';
import { AddressOutput } from '../address/addressOutput';
import { useGukModulesContext } from '../gukModulesProvider';
import { MemberAvatar } from '../member';

export interface IWalletProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, IWeb3ComponentProps {
    /**
     * The connected user details.
     */
    user?: ICompositeAddress;
}

export const Wallet: React.FC<IWalletProps> = (props) => {
    const { user, className, chainId = mainnet.id, wagmiConfig, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const { data: ensName, isLoading: isEnsLoading } = useEnsName({
        address: user == null ? undefined : addressUtils.getChecksum(user.address),
        query: { enabled: user != null && user.name == null },
        chainId,
        config: wagmiConfig,
    });

    const resolvedUserHandle = user?.name ?? ensName ?? addressUtils.truncateAddress(user?.address);
    const contentId = useId();

    const buttonClassName = classNames(
        'flex max-w-48 cursor-pointer items-center gap-3 rounded-full border border-neutral-100 bg-neutral-0 text-neutral-500 transition-all',
        'focus-ring-primary hover:border-neutral-200 active:bg-neutral-50 active:text-neutral-800 disabled:cursor-default',
        { 'px-4 py-2.5': user == null },
        { 'p-1 xl:pl-4': user != null },
        className,
    );

    return (
        <div className={classNames(buttonClassName, 'relative')}>
            <button
                {...otherProps}
                aria-labelledby={contentId}
                className="focus-ring-primary absolute inset-0 z-0 cursor-pointer rounded-full border-0 bg-transparent p-0 disabled:cursor-default"
            />
            <div
                className="pointer-events-none relative z-10 flex w-full items-center gap-3 [&_[role=button]]:pointer-events-auto [&_a]:pointer-events-auto [&_button]:pointer-events-auto"
                id={contentId}
            >
                {!user && copy.wallet.connect}
                {user && isEnsLoading && <StateSkeletonBar className="hidden xl:block" size="lg" width={56} />}
                {user && !isEnsLoading && (
                    <AddressOutput
                        address={user.address}
                        className="hidden truncate xl:block"
                        label={resolvedUserHandle}
                    />
                )}
                {user && (
                    <MemberAvatar
                        address={user.address}
                        avatarSrc={user.avatarSrc}
                        chainId={chainId}
                        ensName={user.name}
                        size="lg"
                        wagmiConfig={wagmiConfig}
                    />
                )}
            </div>
        </div>
    );
};
