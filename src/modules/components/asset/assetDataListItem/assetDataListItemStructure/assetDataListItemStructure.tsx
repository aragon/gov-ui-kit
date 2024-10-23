import classNames from 'classnames';
import type React from 'react';
import { useMemo } from 'react';
import { Avatar, DataList, NumberFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../../core';
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
    /**
     * The price change in percentage of the asset.
     * @default 0
     */
    priceChange?: number;
};

export const AssetDataListItemStructure: React.FC<IAssetDataListItemStructureProps> = (props) => {
    const { logoSrc, name, amount, symbol, fiatPrice, priceChange = 0, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const fiatAmount = Number(amount) * Number(fiatPrice ?? 0);

    const fiatAmountChanged = useMemo(() => {
        if (!fiatPrice || !priceChange) {
            return 0;
        }

        const oldFiatAmount = (100 / (priceChange + 100)) * fiatAmount;

        return fiatAmount - oldFiatAmount;
    }, [fiatAmount, fiatPrice, priceChange]);

    const changedAmountClasses = classNames(
        'text-sm font-normal leading-tight md:text-base',
        { 'text-success-800': fiatAmountChanged > 0 },
        { 'text-neutral-500': fiatAmountChanged === 0 },
        { 'text-critical-800': fiatAmountChanged < 0 },
    );

    const tagVariant = priceChange > 0 ? 'success' : priceChange < 0 ? 'critical' : 'neutral';

    const formattedAmount = formatterUtils.formatNumber(amount, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
        fallback: '',
    });

    const formattedPrice = formatterUtils.formatNumber(fiatAmount, {
        format: NumberFormat.FIAT_TOTAL_SHORT,
        fallback: '-',
    });

    const formattedPriceChanged = formatterUtils.formatNumber(fiatAmountChanged, {
        format: NumberFormat.FIAT_TOTAL_SHORT,
        withSign: true,
    });

    const formattedPriceChangedPercentage = formatterUtils.formatNumber(priceChange / 100, {
        format: NumberFormat.PERCENTAGE_LONG,
        withSign: true,
    });

    return (
        <DataList.Item {...otherProps}>
            <div className="flex gap-x-3 py-0 md:py-1.5">
                <div className="flex items-center">
                    <Avatar src={logoSrc} responsiveSize={{ md: 'md', sm: 'sm' }} className="block" />
                </div>
                <div className="flex w-full min-w-0 shrink justify-between gap-3">
                    <div className="flex flex-col gap-y-0.5 truncate">
                        <span className="truncate text-sm leading-tight text-neutral-800 md:text-base">{name}</span>
                        <p className="truncate text-sm leading-tight text-neutral-500 md:text-base">
                            <span>{formattedAmount} </span>
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
                                    <span className={changedAmountClasses}>{formattedPriceChanged}</span>
                                    <Tag label={formattedPriceChangedPercentage!} variant={tagVariant} />
                                </div>
                            </>
                        ) : (
                            <span className="text-sm leading-tight text-neutral-800 md:text-base">
                                {copy.assetDataListItemStructure.unknown}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
