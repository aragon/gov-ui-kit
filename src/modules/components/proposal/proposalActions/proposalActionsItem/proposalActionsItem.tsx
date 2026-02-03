import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext, useWatch, type Control } from 'react-hook-form';
import { formatUnits } from 'viem';
import { mainnet } from 'viem/chains';
import { useChains } from 'wagmi';
import { Accordion, AlertCard, Button, Dropdown, IconType, Tooltip, invariant } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { SmartContractFunctionDataListItem } from '../../../smartContract/smartContractFunctionDataListItem';
import { useProposalActionsContext } from '../proposalActionsContext';
import { ProposalActionsDecoder, ProposalActionsDecoderView } from '../proposalActionsDecoder';
import { ProposalActionsDecoderMode } from '../proposalActionsDecoder/proposalActionsDecoder.api';
import type { IProposalAction } from '../proposalActionsDefinitions';
import type { IProposalActionsItemProps, ProposalActionsItemViewMode } from './proposalActionsItem.api';
import { ProposalActionsItemBasicView } from './proposalActionsItemBasicView';
import { proposalActionsItemUtils } from './proposalActionsItemUtils';

// Safe wrapper around useWatch to avoid throwing when no FormProvider/control is available.
const useWatchSafe = (control: Control | undefined, name?: string): string | undefined => {
    try {
        const value = useWatch({ control, name: name ?? '' }) as unknown;
        if (value == null) {
            return undefined;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number' || typeof value === 'bigint' || typeof value === 'boolean') {
            return value.toString();
        }
        return undefined;
    } catch {
        return undefined;
    }
};

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
        actionFunctionSelector,
        index,
        value,
        CustomComponent,
        arrayControls,
        actionCount,
        editMode: editModeProp,
        formPrefix,
        readOnly = false,
        chainId = mainnet.id,
        ...web3Props
    } = props;

    invariant(
        index != null,
        'ProposalActionsItem: component must be used inside the ProposalActions.Container component to work properly.',
    );

    const { copy } = useGukModulesContext();
    const { editMode: editModeContext } = useProposalActionsContext();

    // Use prop if provided, otherwise fall back to context
    const editMode = editModeProp ?? editModeContext;

    const chains = useChains();
    const chain = chains.find((chain) => chain.id === chainId);
    const currencySymbol = chain?.nativeCurrency.symbol ?? 'ETH';

    const itemRef = useRef<HTMLDivElement>(null);
    const shouldScrollRef = useRef(false);
    const supportsBasicView = CustomComponent != null || proposalActionsItemUtils.isActionSupported(action);

    // There are a few cases here to take care:
    // - actions with a basic view should have decoded and raw views enabled, but in "watch" mode (no edit allowed)
    // - actions without a basic view, in general, should support decoded view if ABI is present, in which case the raw view is enabled but in watch mode only
    //      - subcase: for write actions without params (like `pause`/`unpause`), decoded view is enabled, but it shows the message about no params. Raw view is disabled and populated with function selector in the data field. This part was confusing before, as data field was empty and action would fail if selector is not added manually.
    // - RAW_CALLDATA action is an action without params, but it should have decode view disabled and raw view enabled, so that calldata could be pasted.
    // - Native transfer action is also an action without params. It has a basic view, it should have disabled decoded view, and raw view enabled, but in watch mode, no edit should be allowed.
    const isAbiAvailable = action.inputData != null;
    const isRawCalldataAction = action.type === 'RAW_CALLDATA';
    const isNativeTransfer = action.data === '0x';
    const supportsDecodedView = isAbiAvailable && !isRawCalldataAction && !isNativeTransfer;

    const [activeViewMode, setActiveViewMode] = useState<ProposalActionsItemViewMode>(
        supportsBasicView
            ? 'BASIC'
            : supportsDecodedView
              ? ProposalActionsDecoderView.DECODED
              : ProposalActionsDecoderView.RAW,
    );

    const onViewModeChange = (value: ProposalActionsItemViewMode) => {
        setActiveViewMode(value);
        itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    useEffect(() => {
        if (!shouldScrollRef.current) {
            return;
        }

        shouldScrollRef.current = false;
        requestAnimationFrame(() => itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }, [index]);

    const handleMoveClick = (direction: 'up' | 'down') => {
        const control = direction === 'up' ? arrayControls?.moveUp : arrayControls?.moveDown;

        if (control) {
            shouldScrollRef.current = true;
            control.onClick(index, action);
        }
    };

    // Watch the live form value when available; fall back to the static action prop
    const watchNameValue = formPrefix ? `${formPrefix}.value` : undefined;
    const watchNameData = formPrefix ? `${formPrefix}.data` : undefined;

    let formControl: Control | undefined;
    try {
        const ctx = useFormContext();
        formControl = ctx.control as Control | undefined;
    } catch {
        formControl = undefined;
    }

    const watchedValue = useWatchSafe(formControl, watchNameValue);
    const watchedData = useWatchSafe(formControl, watchNameData);

    const hasFormControl = Boolean(
        !readOnly && formControl != null && (formControl as { control?: unknown }).control != null && formPrefix,
    );

    const currentValue = hasFormControl && watchNameValue ? (watchedValue ?? action.value) : action.value;
    const currentData = hasFormControl && watchNameData ? (watchedData ?? action.data) : action.data;

    // Display value warning when a transaction is sending value but it's not a native transfer (data !== '0x')
    const parsedValue = (() => {
        try {
            const normalizedValue = currentValue.trim();
            return normalizedValue === '' ? BigInt(0) : BigInt(normalizedValue);
        } catch {
            return BigInt(0);
        }
    })();
    const displayValueWarning = parsedValue !== BigInt(0) && currentData.trim() !== '0x';

    const formattedValue = formatUnits(parsedValue, 18); // use parsedValue to avoid crashes

    const viewModes = [
        { mode: 'BASIC' as const, disabled: !supportsBasicView },
        { mode: ProposalActionsDecoderView.DECODED, disabled: !supportsDecodedView },
        { mode: ProposalActionsDecoderView.RAW },
    ];

    const { EDIT, WATCH, READ } = ProposalActionsDecoderMode;

    const decodedViewMode = useMemo(() => {
        if (!editMode) {
            return READ;
        }

        return supportsBasicView ? WATCH : EDIT;
    }, [EDIT, READ, WATCH, editMode, supportsBasicView]);

    const rawViewMode = useMemo(() => {
        if (!editMode) {
            return READ;
        }

        // There is a case when a basic view is supported but not a decoded view, i.e. native transfer
        return supportsDecodedView || supportsBasicView ? WATCH : EDIT;
    }, [EDIT, READ, WATCH, editMode, supportsBasicView, supportsDecodedView]);

    return (
        <Accordion.Item value={value ?? index.toString()} ref={itemRef}>
            <Accordion.ItemHeader
                className="min-w-0"
                removeControl={editMode && arrayControls != null ? arrayControls.remove : undefined}
                index={index}
            >
                <SmartContractFunctionDataListItem.Structure
                    contractName={action.inputData?.contract}
                    contractAddress={action.to}
                    functionName={action.inputData?.function}
                    functionSelector={actionFunctionSelector}
                    chainId={chainId}
                    className="w-full bg-transparent"
                    asChild={true}
                    displayWarning={displayValueWarning}
                />
            </Accordion.ItemHeader>
            <Accordion.ItemContent
                forceMount={editMode ? true : undefined}
                className={classNames({ 'cursor-default': editMode })}
            >
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
                        {editMode && arrayControls && actionCount != null && actionCount > 1 && (
                            <div className="flex items-center gap-3 text-neutral-500">
                                <Tooltip content={arrayControls.moveDown.label} triggerAsChild={true}>
                                    <Button
                                        variant="tertiary"
                                        size="sm"
                                        aria-label={arrayControls.moveDown.label}
                                        iconLeft={IconType.CHEVRON_DOWN}
                                        onClick={() => handleMoveClick('down')}
                                        disabled={arrayControls.moveDown.disabled}
                                    />
                                </Tooltip>
                                <p className="text-sm text-neutral-500">
                                    {index + 1} {copy.proposalActionsItem.of} {actionCount}
                                </p>
                                <Tooltip content={arrayControls.moveUp.label} triggerAsChild={true}>
                                    <Button
                                        variant="tertiary"
                                        size="sm"
                                        aria-label={arrayControls.moveUp.label}
                                        iconLeft={IconType.CHEVRON_UP}
                                        onClick={() => handleMoveClick('up')}
                                        disabled={arrayControls.moveUp.disabled}
                                    />
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </div>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
