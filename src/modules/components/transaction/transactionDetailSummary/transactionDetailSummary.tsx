import classNames from 'classnames';
import { DateFormat, DefinitionList, formatterUtils } from '../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../hooks';
import { addressUtils } from '../../../utils';
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
    const executedByLabel =
        executorLabel ?? (executorAddress == null ? undefined : addressUtils.truncateAddress(executorAddress));
    const executedByLink =
        executorHref == null
            ? executorAddress == null
                ? undefined
                : { href: buildEntityUrl({ type: ChainEntityType.ADDRESS, id: executorAddress }) }
            : { href: executorHref, isExternal: false };

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
                    copyValue={transactionHash}
                    link={{ href: transactionHref }}
                    term={componentCopy.transaction}
                >
                    {addressUtils.truncateHash(transactionHash)}
                </DefinitionList.Item>
                <DefinitionList.Item term={componentCopy.executedOn}>{formattedDate}</DefinitionList.Item>
            </DefinitionList.Container>
        </div>
    );
};
