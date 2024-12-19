import classNames from 'classnames';
import { Avatar, AvatarIcon, IconType, LinkBase, NumberFormat, formatterUtils } from '../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../hooks';
import { type ICompositeAddress, type IWeb3ComponentProps } from '../../../types';
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
    /**
     * Transaction hash.
     */
    hash?: string;
}

export const AssetTransfer: React.FC<IAssetTransferProps> = (props) => {
    const {
        sender,
        recipient,
        assetName,
        assetIconSrc,
        assetAmount,
        assetSymbol,
        assetFiatPrice,
        chainId,
        hash,
        wagmiConfig,
    } = props;

    const { buildEntityUrl } = useBlockExplorer({ chains: wagmiConfig?.chains, chainId });

    const senderUrl = buildEntityUrl({ type: ChainEntityType.ADDRESS, id: sender.address });
    const recipientUrl = buildEntityUrl({ type: ChainEntityType.ADDRESS, id: recipient.address });
    const transactionUrl = buildEntityUrl({ type: ChainEntityType.TRANSACTION, id: hash });

    const formattedTokenValue = formatterUtils.formatNumber(assetAmount, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
        withSign: true,
        fallback: '-',
    })!;
    const formattedTokenAmount = `${formattedTokenValue} ${assetSymbol}`;

    const fiatValue = Number(assetAmount) * Number(assetFiatPrice);
    const formattedFiatValue = formatterUtils.formatNumber(fiatValue, {
        format: NumberFormat.FIAT_TOTAL_SHORT,
        fallback: ` `,
    });

    const baseClassnames =
        'flex h-16 w-full items-center justify-between rounded-xl border border-neutral-100 bg-neutral-0 px-4 md:h-20 md:px-6';
    const linkClassnames = hash
        ? 'hover:border-neutral-200 hover:shadow-neutral-md focus:outline-none focus-visible:rounded-xl focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset'
        : '';

    const assetTransferClassNames = classNames(baseClassnames, linkClassnames);

    const AssetTransferContent = (
        <>
            <div className="flex items-center space-x-3 md:space-x-4">
                <Avatar responsiveSize={{ md: 'md' }} src={assetIconSrc} />
                <span className="text-sm leading-tight text-neutral-800 md:text-base">{assetName}</span>
            </div>
            <div className="flex flex-col items-end justify-end">
                <span className="text-sm leading-tight text-neutral-800 md:text-base">{formattedTokenAmount}</span>
                <span className="text-sm leading-tight text-neutral-500 md:text-base">{formattedFiatValue}</span>
            </div>
        </>
    );
    return (
        <div className="flex size-full flex-col gap-y-2 md:gap-y-3">
            <div className="relative flex h-full flex-col rounded-xl bg-neutral-0 md:flex-row">
                <AssetTransferAddress txRole="sender" participant={sender} addressUrl={senderUrl} />
                <div className="border-t border-neutral-100 md:border-l" />
                <AvatarIcon
                    icon={IconType.CHEVRON_DOWN}
                    size="sm"
                    className={classNames(
                        'absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-50 text-neutral-300', //base
                        'md:left-1/2 md:-translate-x-1/2 md:-rotate-90', //responsive
                    )}
                />
                <AssetTransferAddress txRole="recipient" participant={recipient} addressUrl={recipientUrl} />
            </div>
            {hash ? (
                <LinkBase
                    href={transactionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={assetTransferClassNames}
                >
                    {AssetTransferContent}
                </LinkBase>
            ) : (
                <div className={assetTransferClassNames}>{AssetTransferContent}</div>
            )}
        </div>
    );
};
