import classNames from 'classnames';
import type React from 'react';
import { Avatar, DataList, NumberFormat, formatterUtils, type IDataListItemProps } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';

export type IAssetDataListItemStructureProps = IDataListItemProps & {
    /**
     * The name of the asset.
     */
    name: string;
    /**
     * The symbol of the asset.
     */
    symbol: string;
    /**
     * The amount of the asset.
     */
    amount: number | string;
    /**
     * The logo source of the asset
     */
    logoSrc?: string;
    /**
     * The fiat price of the asset.
     */
    fiatPrice?: number | string;
};

export const AssetDataListItemStructure: React.FC<IAssetDataListItemStructureProps> = (props) => {
    const { logoSrc, name, amount, symbol, fiatPrice, className, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const fiatAmount = Number(amount) * Number(fiatPrice ?? 0);

    const formattedAmount = formatterUtils.formatNumber(amount, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
        fallback: '',
    });

    const formattedPrice = formatterUtils.formatNumber(fiatAmount, {
        format: NumberFormat.FIAT_TOTAL_SHORT,
        fallback: '-',
    });

    return (
        <DataList.Item
            className={classNames('flex items-center justify-between gap-x-3 py-3 md:py-5', className)}
            {...otherProps}
        >
            <div className="flex min-w-0 items-center gap-3">
                <Avatar src={logoSrc} responsiveSize={{ md: 'md', sm: 'sm' }} className="block shrink-0" />
                <div className="flex flex-col gap-y-1 truncate">
                    <span className="truncate text-base leading-tight text-neutral-800 md:text-lg">{name}</span>
                    {!fiatPrice && (
                        <p className="truncate text-sm leading-tight text-neutral-500 md:text-base">
                            <span>{formattedAmount} </span>
                            <span className="truncate">{symbol}</span>
                        </p>
                    )}
                </div>
            </div>
            <div className="flex min-w-0 items-end justify-end gap-x-2 text-right">
                {fiatPrice ? (
                    <div className="flex min-w-0 flex-col gap-y-1">
                        <span className="shrink-0 text-base leading-tight text-neutral-800 md:text-lg">
                            {formattedPrice}
                        </span>
                        <div className="flex min-w-0 items-center gap-1">
                            <p className="shrink-0 text-sm leading-tight text-neutral-500 md:text-base">
                                {formattedAmount}
                            </p>
                            <p className="min-w-0 truncate text-sm leading-tight text-neutral-500 md:text-base">
                                {symbol}
                            </p>
                        </div>
                    </div>
                ) : (
                    <span className="text-sm leading-tight text-neutral-800 md:text-base">
                        {copy.assetDataListItemStructure.unknown}
                    </span>
                )}
            </div>
        </DataList.Item>
    );
};
