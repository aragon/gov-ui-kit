import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import { Dialog } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';

export interface ITransactionDetailRootProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Title displayed in the dialog header. Defaults to the localized "Executed" copy.
     */
    title?: string;
    /**
     * Callback triggered on close-button click. The close button is hidden when the property is not set.
     */
    onClose?: () => void;
}

/**
 * The `<TransactionDetail.Root />` component renders the dialog header and the scrollable content shell of an
 * execution detail dialog. Compose it with `<TransactionDetailSummary />` and an action-list component such as
 * `<ProposalActions />` for decoded execution actions. It must be rendered inside a `<Dialog.Root />`.
 */
export const TransactionDetailRoot: React.FC<ITransactionDetailRootProps> = (props) => {
    const { title, onClose, children, className, ...otherProps } = props;

    const { copy } = useGukModulesContext();

    return (
        <>
            <Dialog.Header onClose={onClose} title={title ?? copy.transactionDetail.title} />
            <Dialog.Content className={classNames('pt-2 pb-4 md:pt-3 md:pb-6', className)} {...otherProps}>
                <div className="flex w-full flex-col gap-y-2 md:gap-y-3">{children}</div>
            </Dialog.Content>
        </>
    );
};
