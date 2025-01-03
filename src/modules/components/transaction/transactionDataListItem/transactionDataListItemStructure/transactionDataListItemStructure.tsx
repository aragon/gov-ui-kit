import classNames from 'classnames';
import {
    AvatarIcon,
    DataList,
    DateFormat,
    IconType,
    NumberFormat,
    Spinner,
    formatterUtils,
    type AvatarIconVariant,
} from '../../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../../hooks';
import {
    TransactionStatus,
    TransactionType,
    type ITransactionDataListItemProps,
} from './transactionDataListItemStructure.api';

const txHeadingStringList: Record<TransactionType, string> = {
    [TransactionType.DEPOSIT]: 'Deposit',
    [TransactionType.WITHDRAW]: 'Withdraw',
    [TransactionType.ACTION]: 'Smart contract action',
};

const txIconTypeList: Record<TransactionType, IconType> = {
    [TransactionType.DEPOSIT]: IconType.DEPOSIT,
    [TransactionType.WITHDRAW]: IconType.WITHDRAW,
    [TransactionType.ACTION]: IconType.BLOCKCHAIN_SMARTCONTRACT,
};

const txVariantList: Record<TransactionType, AvatarIconVariant> = {
    [TransactionType.DEPOSIT]: 'success',
    [TransactionType.WITHDRAW]: 'warning',
    [TransactionType.ACTION]: 'info',
};

export const TransactionDataListItemStructure: React.FC<ITransactionDataListItemProps> = (props) => {
    const {
        chainId,
        tokenSymbol,
        tokenAmount,
        amountUsd,
        type = TransactionType.ACTION,
        status = TransactionStatus.PENDING,
        date,
        hash,
        className,
        ...otherProps
    } = props;

    const { buildEntityUrl } = useBlockExplorer({ chainId });

    const blockExplorerHref = buildEntityUrl({ type: ChainEntityType.TRANSACTION, id: hash });
    const processedHref = 'href' in otherProps && otherProps.href != null ? otherProps.href : blockExplorerHref;

    const formattedTokenValue = formatterUtils.formatNumber(tokenAmount, { format: NumberFormat.TOKEN_AMOUNT_SHORT });
    const formattedTokenPrice = formatterUtils.formatNumber(amountUsd, {
        format: NumberFormat.FIAT_TOTAL_SHORT,
        fallback: '-',
    });
    const formattedTokenAmount =
        type === TransactionType.ACTION || formattedTokenValue == null ? '-' : `${formattedTokenValue} ${tokenSymbol}`;

    return (
        <DataList.Item
            className={classNames('flex items-center justify-between gap-x-3 py-3 md:gap-x-4 md:py-5', className)}
            href={processedHref}
            {...otherProps}
        >
            {status === TransactionStatus.SUCCESS && (
                <AvatarIcon variant={txVariantList[type]} icon={txIconTypeList[type]} responsiveSize={{ md: 'md' }} />
            )}
            {status === TransactionStatus.FAILED && (
                <AvatarIcon variant="critical" icon={IconType.CLOSE} responsiveSize={{ md: 'md' }} />
            )}
            {status === TransactionStatus.PENDING && (
                <div className="flex size-6 shrink-0 items-center justify-center md:size-8">
                    <Spinner className="transition" variant="neutral" responsiveSize={{ md: 'lg' }} />
                </div>
            )}
            <div className="flex w-full flex-col items-start gap-y-1 self-center">
                <span className="leading-tight text-neutral-800 md:text-lg">{txHeadingStringList[type]}</span>
                {date && (
                    <p className="text-sm leading-tight text-neutral-500 md:text-base">
                        {formatterUtils.formatDate(date, { format: DateFormat.YEAR_MONTH_DAY_TIME })}
                    </p>
                )}
            </div>

            <div className="flex shrink-0 flex-col items-end gap-y-1 truncate">
                <span className="leading-tight text-neutral-800 md:text-lg">{formattedTokenAmount}</span>
                <span className="text-sm leading-tight text-neutral-500 md:text-base">{formattedTokenPrice}</span>
            </div>
        </DataList.Item>
    );
};
