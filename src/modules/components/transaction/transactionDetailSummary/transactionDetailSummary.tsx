import classNames from 'classnames';
import { DateFormat, DefinitionList, formatterUtils } from '../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../hooks';
import { useGukModulesContext } from '../../gukModulesProvider';
import type { ITransactionDetailSummaryProps } from './transactionDetailSummary.api';

export const TransactionDetailSummary: React.FC<ITransactionDetailSummaryProps> = (props) => {
    const {
        chainId,
        executedBy,
        proposalId,
        proposalHref,
        totalActions,
        transactionHash,
        date,
        className,
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();
    const componentCopy = copy.transactionDetailSummary;

    const { buildEntityUrl } = useBlockExplorer({ chainId });

    const {
        address: executorAddress,
        label: executorLabel,
        helptext: executorHelptext,
        href: executorHref,
    } = executedBy;
    const transactionHref = buildEntityUrl({ type: ChainEntityType.TRANSACTION, id: transactionHash });

    // An internal `href` (e.g. a process detail page) takes precedence; otherwise the address links to the block
    // explorer. The label defaults to the truncated address when not provided.
    const executedByLabel = executorLabel ?? executorAddress;
    const executedByLink =
        executorAddress == null
            ? executorHref == null
                ? undefined
                : { href: executorHref, isExternal: false }
            : executorHref == null
              ? { href: buildEntityUrl({ type: ChainEntityType.ADDRESS, id: executorAddress }), isOnchainEntity: true }
              : { href: executorHref, isExternal: false, isOnchainEntity: true };

    const formattedDate = formatterUtils.formatDate(date, { format: DateFormat.YEAR_MONTH_DAY_TIME });

    return (
        <div className={classNames('rounded-xl border border-neutral-100 bg-neutral-0 px-4 md:px-6', className)}>
            <DefinitionList.Container {...otherProps}>
                <DefinitionList.Item
                    copyValue={executorAddress}
                    description={executorHelptext}
                    link={executedByLink}
                    term={componentCopy.executedBy}
                >
                    {executedByLabel}
                </DefinitionList.Item>
                {proposalId != null && (
                    <DefinitionList.Item
                        copyValue={proposalId}
                        link={proposalHref == null ? undefined : { href: proposalHref, isExternal: false }}
                        term={componentCopy.proposal}
                    >
                        {proposalId}
                    </DefinitionList.Item>
                )}
                <DefinitionList.Item term={componentCopy.totalActions}>{totalActions}</DefinitionList.Item>
                <DefinitionList.Item
                    link={{ href: transactionHref, isOnchainEntity: true }}
                    term={componentCopy.transaction}
                >
                    {transactionHash}
                </DefinitionList.Item>
                <DefinitionList.Item term={componentCopy.executedOn}>{formattedDate}</DefinitionList.Item>
            </DefinitionList.Container>
        </div>
    );
};
