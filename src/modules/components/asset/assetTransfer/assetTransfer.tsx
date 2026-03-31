import classNames from 'classnames';
import { zeroAddress } from 'viem';
import { mainnet } from 'viem/chains';
import { Avatar, AvatarIcon, DataList, formatterUtils, IconType, NumberFormat } from '../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../hooks';
import type { ICompositeAddress, IWeb3ComponentProps } from '../../../types';
import { AssetTransferAddress } from './assetTransferAddress';

export interface IAssetTransferProps extends IWeb3ComponentProps {
    /**
     * Sender of the transaction.
     */
    sender: ICompositeAddress;
    /**
     * Recipient of the transaction.
     */
    recipient: ICompositeAddress;
    /**
     * Name of the asset transferred.
     */
    assetName: string;
    /**
     * Address of the asset transferred.
     */
    assetAddress?: string;
    /**
     * Icon URL of the transferred asset.
     */
    assetIconSrc?: string;
    /**
     * Asset amount that was transferred.
     */
    assetAmount: number | string;
    /**
     * Symbol of the asset transferred. Example: ETH, DAI, etc.
     */
    assetSymbol: string;
    /**
     * Price per asset in fiat.
     */
    assetFiatPrice?: number | string;
}

export const AssetTransfer: React.FC<IAssetTransferProps> = (props) => {
    const {
        sender,
        recipient,
        assetName,
        assetAddress,
        assetIconSrc,
        assetAmount,
        assetSymbol,
        assetFiatPrice,
        chainId = mainnet.id,
        wagmiConfig,
    } = props;

    const { buildEntityUrl } = useBlockExplorer({ chains: wagmiConfig?.chains, chainId });

    const senderUrl = buildEntityUrl({ type: ChainEntityType.ADDRESS, id: sender.address });
    const recipientUrl = buildEntityUrl({ type: ChainEntityType.ADDRESS, id: recipient.address });

    // For native transfers we do not want to link to the block explorer
    const isNativeTransfer = assetAddress === zeroAddress;
    const assetUrl = isNativeTransfer ? undefined : buildEntityUrl({ type: ChainEntityType.TOKEN, id: assetAddress });

    const formattedTokenValue = formatterUtils.formatNumber(assetAmount, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
        withSign: true,
        fallback: '-',
    })!;
    const formattedTokenAmount = `${formattedTokenValue} ${assetSymbol}`;

    const fiatValue = Number(assetAmount) * Number(assetFiatPrice);
    const formattedFiatValue = formatterUtils.formatNumber(fiatValue, {
        format: NumberFormat.FIAT_TOTAL_SHORT,
        fallback: ' ',
    });

    return (
        <div className="flex size-full flex-col gap-y-2 md:gap-y-3">
            <div className="relative flex h-full flex-col rounded-xl bg-neutral-0 md:flex-row">
                <AssetTransferAddress addressUrl={senderUrl} participant={sender} txRole="sender" />
                <div className="border-neutral-100 border-t md:border-l" />
                <AvatarIcon
                    className={classNames(
                        'absolute top-1/2 left-4 -translate-y-1/2 bg-neutral-50 text-neutral-300', //base
                        'md:left-1/2 md:-translate-x-1/2 md:-rotate-90', //responsive
                    )}
                    icon={IconType.CHEVRON_DOWN}
                    size="sm"
                />
                <AssetTransferAddress addressUrl={recipientUrl} participant={recipient} txRole="recipient" />
            </div>
            <DataList.Item
                className="flex h-16 items-center justify-between px-4 md:h-20 md:px-6"
                href={assetUrl}
                rel="noopener noreferrer"
                target="_blank"
            >
                <div className="flex items-center space-x-3 md:space-x-4">
                    <Avatar responsiveSize={{ md: 'md' }} src={assetIconSrc} />
                    <span className="text-neutral-800 text-sm leading-tight md:text-base">{assetName}</span>
                </div>
                <div className="flex flex-col items-end justify-end">
                    <span className="text-neutral-800 text-sm leading-tight md:text-base">{formattedTokenAmount}</span>
                    <span className="text-neutral-500 text-sm leading-tight md:text-base">{formattedFiatValue}</span>
                </div>
            </DataList.Item>
        </div>
    );
};
