import classNames from 'classnames';
import { type ComponentProps } from 'react';
import { Heading, Icon, IconType } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { type IProposalAction } from '../types';

export interface IProposalActionsActionVerificationProps extends ComponentProps<'div'> {
    /**
     * Proposal action base.
     */
    action: IProposalAction;
}

export const ProposalActionsActionVerification: React.FC<IProposalActionsActionVerificationProps> = (props) => {
    const { action, className, ...otherProps } = props;

    const contractClassName = action.inputData == null ? 'text-warning-800' : 'text-neutral-500';
    const contractName = action.inputData?.contract;
    const icon =
        action.inputData == null
            ? { className: 'text-warning-500', icon: IconType.WARNING }
            : { className: 'text-primary-300', icon: IconType.SUCCESS };

    return (
        <div className={classNames('flex items-center gap-x-1.5', className)} {...otherProps}>
            <Heading size="h5" className={classNames('shrink-0', contractClassName)}>
                {addressUtils.truncateAddress(action.to)}
            </Heading>
            {contractName && (
                <Heading size="h5" className="truncate text-primary-400">
                    {contractName}
                </Heading>
            )}
            <Icon className={icon.className} icon={icon.icon} />
        </div>
    );
};
