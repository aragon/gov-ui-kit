import classNames from 'classnames';
import { toFunctionSelector } from 'viem';
import { mainnet } from 'viem/chains';
import type { IProposalActionInputDataParameter } from '../../..';
import {
    Button,
    DataList,
    Dropdown,
    Icon,
    IconType,
    Link,
    LinkBase,
    type IDataListItemProps,
} from '../../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../../hooks';
import { addressUtils } from '../../../../utils';
import { useGukModulesContext } from '../../../gukModulesProvider';

export type ISmartContractFunctionDataListItemProps = IDataListItemProps & {
    /**
     * The name of the smart contract function.
     */
    functionName?: string;
    /**
     * The name of the smart contract.
     */
    contractName?: string;
    /**
     * The address of the smart contract.
     */
    contractAddress: string;
    /**
     * The parameters to pass to the function.
     */
    functionParameters?: IProposalActionInputDataParameter[];
    /**
     * Callback when function is removed.
     */
    onRemove?: () => void;
    /**
     * The chain ID of the smart contract.
     * @default mainnet.id (1)
     */
    chainId?: number;
    /**
     * Flag to determine whether or not the item is a child of another component so we can apply the correct styles.
     */
    asChild?: boolean;
    /**
     * Flag to determine whether or not to display warning icon.
     * @default false
     */
    displayWarning?: boolean;
};

export const SmartContractFunctionDataListItemStructure: React.FC<ISmartContractFunctionDataListItemProps> = (
    props,
) => {
    const {
        functionName,
        functionParameters,
        contractName,
        contractAddress,
        chainId = mainnet.id,
        className,
        onRemove,
        asChild,
        displayWarning = false,
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();
    const { buildEntityUrl } = useBlockExplorer({ chainId });

    const blockExplorerHref = buildEntityUrl({ type: ChainEntityType.ADDRESS, id: contractAddress });

    const functionLabel = functionName ?? copy.smartContractFunctionDataListItemStructure.notVerified.function;
    const contractLabel = contractName ?? copy.smartContractFunctionDataListItemStructure.notVerified.contract;

    const functionSignature =
        functionName && functionParameters
            ? `${functionName}(${functionParameters.map((param) => param.type).join(',')})`
            : undefined;

    const functionSelector = functionSignature ? toFunctionSelector(functionSignature) : undefined;

    const hasVerifiedNames = !!functionName && !!contractName;
    const displayWarningFeedback = displayWarning || !hasVerifiedNames;

    const containerClassName = asChild
        ? '!p-0 border-none shadow-none'
        : 'flex items-center justify-between gap-x-3 py-3 md:gap-x-4 md:py-5';

    const functionLabelStyle = displayWarningFeedback ? 'text-warning-800' : 'text-neutral-800';

    return (
        <DataList.Item className={classNames(containerClassName, className)} {...otherProps}>
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                    <p className={classNames('text-lg text-neutral-800', functionLabelStyle)}>{functionLabel}</p>
                    {functionSelector && <p className="text-lg text-neutral-500">{functionSelector}</p>}
                    {displayWarningFeedback && <Icon icon={IconType.WARNING} size="md" className="text-warning-500" />}
                </div>
                <LinkBase className="flex w-fit items-center gap-3" href={blockExplorerHref} target="_blank">
                    <p className="text-neutral-500">{contractLabel}</p>
                    {/* Using solution from https://kizu.dev/nested-links/ to nest anchor tags */}
                    <object type="unknown">
                        <Link className="shrink-0" href={blockExplorerHref} isExternal={true}>
                            {addressUtils.truncateAddress(contractAddress)}
                        </Link>
                    </object>
                </LinkBase>
            </div>
            {onRemove && (
                <Dropdown.Container
                    customTrigger={<Button variant="tertiary" size="md" iconLeft={IconType.DOTS_VERTICAL} />}
                >
                    <Dropdown.Item icon={IconType.REMOVE} iconPosition="left" onClick={onRemove}>
                        {copy.smartContractFunctionDataListItemStructure.remove}
                    </Dropdown.Item>
                </Dropdown.Container>
            )}
        </DataList.Item>
    );
};
