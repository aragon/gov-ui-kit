import classNames from 'classnames';
import type React from 'react';
import { useMemo } from 'react';
import { Avatar, DataList, NumberFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../../core';

export interface IAssetDataListItemStructureProps extends IDataListItemProps {
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
    /**
     * the price change in percentage of the asset (E.g. in last 24h).
     * @default 0
     */
    priceChange?: number;
}

export const AssetDataListItemStructure: React.FC<IAssetDataListItemStructureProps> = (props) => {
    const { logoSrc, name, amount, symbol, fiatPrice, priceChange = 0, ...otherProps } = props;

    const usdAmountChanged = useMemo(() => {
        if (!fiatPrice || !priceChange) {
            return 0;
        }
        const usdAmount = (amount ? Number(amount) : 0) * (fiatPrice ? Number(fiatPrice) : 0);
        const oldUsdAmount = (100 / (priceChange + 100)) * usdAmount;
        return usdAmount - oldUsdAmount;
    }, [amount, fiatPrice, priceChange]);

    const sign = (value: number) => (value > 0 ? '+' : value < 0 ? '-' : '');

    const changedAmountClasses = classNames(
        'text-sm font-normal leading-tight md:text-base',
        { 'text-success-800': usdAmountChanged > 0 },
        { 'text-neutral-500': usdAmountChanged === 0 },
        { 'text-critical-800': usdAmountChanged < 0 },
    );

    const formattedAmount = formatterUtils.formatNumber(amount, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
        fallback: '',
    });

    const formattedPrice = formatterUtils.formatNumber(
        (amount ? Number(amount) : 0) * (fiatPrice ? Number(fiatPrice) : 0),
        {
            format: NumberFormat.FIAT_TOTAL_SHORT,
            fallback: '-',
        },
    );

    const formattedPriceChanged = formatterUtils.formatNumber(Math.abs(usdAmountChanged), {
        format: NumberFormat.FIAT_TOTAL_SHORT,
    });

    const formattedPriceChangedPercentage = formatterUtils.formatNumber(Math.abs(priceChange / 100), {
        format: NumberFormat.PERCENTAGE_SHORT,
    });

    return (
        <DataList.Item {...otherProps}>
            <div className="flex gap-x-3 py-0 md:py-1.5">
                <div className="flex items-center">
                    <Avatar src={logoSrc} responsiveSize={{ md: 'md', sm: 'sm' }} className="block" />
                </div>
                <div className=" flex w-full justify-between">
                    <div className="flex flex-col gap-y-0.5">
                        <span className="truncate text-sm leading-tight text-neutral-800 md:text-base">{name}</span>
                        <p className="text-sm leading-tight text-neutral-500 md:text-base">
                            <span>{`${formattedAmount}`} </span>
                            <span className="truncate">{symbol}</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end justify-center gap-y-0.5">
                        {fiatPrice ? (
                            <>
                                <span className="text-sm leading-tight text-neutral-800 md:text-base">
                                    {formattedPrice}
                                </span>
                                <div className="flex items-center gap-x-1">
                                    <span className={changedAmountClasses}>
                                        {sign(usdAmountChanged)}
                                        {formattedPriceChanged}
                                    </span>
                                    <Tag
                                        label={`${sign(priceChange / 100)}${formattedPriceChangedPercentage}`}
                                        variant={priceChange > 0 ? 'success' : priceChange < 0 ? 'critical' : 'neutral'}
                                    />
                                </div>
                            </>
                        ) : (
                            <span className="text-sm leading-tight text-neutral-800 md:text-base">Unknown</span>
                        )}
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
