import classNames from 'classnames';
import { useRef, useState } from 'react';
import { formatUnits } from 'viem';
import { mainnet } from 'viem/chains';
import { useChains } from 'wagmi';
import { Accordion, AlertCard, Button, Dropdown, Icon, IconType, invariant, Link, LinkBase } from '../../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../../hooks';
import { addressUtils } from '../../../../utils';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalActionsDecoder, ProposalActionsDecoderView } from '../proposalActionsDecoder';
import { ProposalActionsDecoderMode } from '../proposalActionsDecoder/proposalActionsDecoder.api';
import type { IProposalAction } from '../proposalActionsDefinitions';
import type { IProposalActionsItemProps, ProposalActionsItemViewMode } from './proposalActionsItem.api';
import { ProposalActionsItemBasicView } from './proposalActionsItemBasicView';
import { proposalActionsItemUtils } from './proposalActionsItemUtils';

/**
 * The `<ProposalActions.Item />` component supports multiple view modes depending if the action supports a basic view
 * and if the parameters for the actions are defined.
 * **_NOTE:_** The component must be used inside a `<FormProvider />` component from `react-hook-form` when used in `editMode`.
 */
export const ProposalActionsItem = <TAction extends IProposalAction = IProposalAction>(
    props: IProposalActionsItemProps<TAction>,
) => {
    const {
        action,
        index,
        value,
        CustomComponent,
        dropdownItems,
        editMode,
        formPrefix,
        chainId = mainnet.id,
        ...web3Props
    } = props;

    invariant(
        index != null,
        'ProposalActionsItem: component must be used inside the ProposalActions.Container component to work properly.',
    );

    const { copy } = useGukModulesContext();
    const { buildEntityUrl } = useBlockExplorer({ chainId });

    const chains = useChains();
    const chain = chains.find((chain) => chain.id === chainId);
    const currencySymbol = chain?.nativeCurrency.symbol ?? 'ETH';

    const itemRef = useRef<HTMLDivElement>(null);

    const supportsBasicView = CustomComponent != null || proposalActionsItemUtils.isActionSupported(action);

    const isAbiAvailable = action.inputData != null;
    const supportsDecodedView = isAbiAvailable && action.inputData?.parameters.length;

    const [activeViewMode, setActiveViewMode] = useState<ProposalActionsItemViewMode>(
        supportsBasicView
            ? 'BASIC'
            : supportsDecodedView
              ? ProposalActionsDecoderView.DECODED
              : ProposalActionsDecoderView.RAW,
    );

    const onViewModeChange = (value: ProposalActionsItemViewMode) => {
        setActiveViewMode(value);
        itemRef.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
    };

    // Display value warning when a transaction is sending value but it's not a native transfer (data !== '0x')
    const displayValueWarning = action.value !== '0' && action.data !== '0x';
    const formattedValue = formatUnits(BigInt(action.value), 18);

    const displayWarningFeedback = displayValueWarning || !isAbiAvailable;
    const functionNameStyle = displayWarningFeedback ? 'text-warning-800' : 'text-neutral-800';

    const targetAddressUrl = buildEntityUrl({ type: ChainEntityType.ADDRESS, id: action.to });

    const viewModes = [
        { mode: 'BASIC' as const, disabled: !supportsBasicView },
        { mode: ProposalActionsDecoderView.DECODED, disabled: !supportsDecodedView },
        { mode: ProposalActionsDecoderView.RAW },
    ];

    const { EDIT, WATCH, READ } = ProposalActionsDecoderMode;
    const decodedViewMode = editMode && !supportsBasicView ? EDIT : editMode ? WATCH : READ;
    const rawViewMode = editMode && !supportsDecodedView ? EDIT : editMode ? WATCH : READ;

    return (
        <Accordion.Item value={value ?? index.toString()} ref={itemRef}>
            <Accordion.ItemHeader className="min-w-0">
                <div className="flex min-w-0 flex-col items-start gap-1 md:gap-1.5">
                    <div className="flex w-full flex-row items-center gap-2">
                        <p
                            className={classNames(
                                'truncate text-base leading-tight font-normal md:text-lg',
                                functionNameStyle,
                            )}
                        >
                            {action.inputData?.function ?? copy.proposalActionsItem.notVerified.function}
                        </p>
                        {displayWarningFeedback && (
                            <Icon icon={IconType.WARNING} size="md" className="text-warning-500" />
                        )}
                    </div>
                    <LinkBase
                        className="flex w-full items-center gap-2 md:gap-3"
                        href={targetAddressUrl}
                        target="_blank"
                    >
                        <p className="truncate text-sm leading-tight font-normal text-neutral-500 md:text-base">
                            {action.inputData?.contract ?? copy.proposalActionsItem.notVerified.contract}
                        </p>
                        {/* Using solution from https://kizu.dev/nested-links/ to nest anchor tags */}
                        <object type="unknown">
                            <Link className="shrink-0" href={targetAddressUrl} isExternal={true}>
                                {addressUtils.truncateAddress(action.to)}
                            </Link>
                        </object>
                    </LinkBase>
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent forceMount={editMode ? true : undefined}>
                <div className="flex flex-col items-start gap-y-6 self-start md:gap-y-8">
                    {displayValueWarning && (
                        <AlertCard variant="warning" message={copy.proposalActionsItem.nativeSendAlert}>
                            {copy.proposalActionsItem.nativeSendDescription(formattedValue, currencySymbol)}
                        </AlertCard>
                    )}
                    {activeViewMode === 'BASIC' && (
                        <ProposalActionsItemBasicView
                            action={action}
                            index={index}
                            CustomComponent={CustomComponent}
                            chainId={chainId}
                            {...web3Props}
                        />
                    )}
                    {activeViewMode === ProposalActionsDecoderView.DECODED && (
                        <ProposalActionsDecoder
                            action={action}
                            formPrefix={formPrefix}
                            mode={decodedViewMode}
                            view={ProposalActionsDecoderView.DECODED}
                        />
                    )}
                    {activeViewMode === ProposalActionsDecoderView.RAW && (
                        <ProposalActionsDecoder
                            action={action}
                            formPrefix={formPrefix}
                            mode={rawViewMode}
                            view={ProposalActionsDecoderView.RAW}
                        />
                    )}
                    <div className="flex w-full flex-row justify-between">
                        <Dropdown.Container label={copy.proposalActionsItem.menu.dropdownLabel} size="sm">
                            {viewModes.map(({ mode, disabled }) => (
                                <Dropdown.Item
                                    key={mode}
                                    onSelect={() => onViewModeChange(mode)}
                                    disabled={disabled}
                                    selected={activeViewMode === mode}
                                >
                                    {copy.proposalActionsItem.menu[mode]}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Container>
                        {dropdownItems != null && dropdownItems.length > 0 && (
                            <Dropdown.Container
                                customTrigger={
                                    <Button variant="tertiary" size="sm" iconRight={IconType.DOTS_VERTICAL}>
                                        {copy.proposalActionsItem.dropdownLabel}
                                    </Button>
                                }
                            >
                                {dropdownItems.map((item) => (
                                    <Dropdown.Item
                                        key={item.label}
                                        icon={item.icon}
                                        iconPosition="left"
                                        onClick={() => item.onClick(action, index)}
                                    >
                                        {item.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Container>
                        )}
                    </div>
                </div>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
