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
    /**
     * Hides the asset value when set to true.
     */
    hideValue?: boolean;
};

export const AssetDataListItemStructure: React.FC<IAssetDataListItemStructureProps> = (props) => {
    const { logoSrc, name, amount, symbol, fiatPrice, className, hideValue, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    const fiatValue = Number(amount) * Number(fiatPrice);
    const formattedValue = formatterUtils.formatNumber(fiatValue, {
        format: NumberFormat.FIAT_TOTAL_SHORT,
        fallback: copy.assetDataListItemStructure.unknown,
    });

    const formattedAmount = formatterUtils.formatNumber(amount, { format: NumberFormat.TOKEN_AMOUNT_SHORT });
    const parsedAmount = `${formattedAmount!} ${symbol}`;

    return (
        <DataList.Item
            className={classNames('flex items-center justify-between gap-x-3 py-3 md:py-5', className)}
            {...otherProps}
        >
            <div className="flex min-w-0 items-center gap-3">
                <Avatar src={logoSrc} responsiveSize={{ md: 'md', sm: 'sm' }} className="block shrink-0" />
                <span className="truncate text-base leading-tight text-neutral-800 md:text-lg">{name}</span>
            </div>
            <div className="flex min-w-0 gap-x-2 text-right">
                <div className="flex min-w-0 flex-col gap-y-1">
                    <span className="truncate text-base leading-tight text-neutral-800 md:text-lg">
                        {hideValue ? parsedAmount : formattedValue}
                    </span>
                    {!hideValue && (
                        <span className="truncate text-sm leading-tight text-neutral-500 md:text-base">
                            {parsedAmount}
                        </span>
                    )}
                </div>
            </div>
        </DataList.Item>
    );
};
