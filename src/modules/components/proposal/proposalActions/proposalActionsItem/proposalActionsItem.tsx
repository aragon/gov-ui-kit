import classNames from 'classnames';
import { useRef, useState } from 'react';
import { formatUnits } from 'viem';
import { Accordion, AlertCard, Button, Dropdown, Heading, Icon, IconType, invariant } from '../../../../../core';
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
    const { action, index, CustomComponent, dropdownItems, editMode, formPrefix, ...web3Props } = props;

    invariant(
        index != null,
        'ProposalActionsItem: component must be used inside the ProposalActions.Container component to work properly.',
    );

    const { copy } = useGukModulesContext();

    const contentRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    const supportsBasicView = CustomComponent != null || proposalActionsItemUtils.isActionSupported(action);
    const isAbiAvailable = action.inputData != null;

    const [activeViewMode, setActiveViewMode] = useState<ProposalActionsItemViewMode>(
        supportsBasicView
            ? 'BASIC'
            : isAbiAvailable
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

    const headerIcon = displayValueWarning
        ? { icon: IconType.CRITICAL, className: 'text-critical-500' }
        : { icon: IconType.WARNING, className: 'text-warning-500' };

    const functionNameStyle = displayValueWarning
        ? 'text-critical-800'
        : !isAbiAvailable
          ? 'text-warning-800'
          : 'text-neutral-800';

    const viewModes = [
        { mode: 'BASIC' as const, disabled: !supportsBasicView },
        { mode: ProposalActionsDecoderView.DECODED, disabled: !isAbiAvailable },
        { mode: ProposalActionsDecoderView.RAW },
    ];

    const { EDIT, WATCH, READ } = ProposalActionsDecoderMode;
    const decodedViewMode = editMode && !supportsBasicView ? EDIT : editMode ? WATCH : READ;
    const rawViewMode = editMode && !isAbiAvailable ? EDIT : editMode ? WATCH : READ;

    return (
        <Accordion.Item value={index.toString()} ref={itemRef}>
            <Accordion.ItemHeader>
                <div className="flex flex-col items-start gap-1 md:gap-1.5">
                    <div className="flex flex-row items-center gap-2">
                        <p className={classNames('text-base font-normal leading-tight md:text-lg', functionNameStyle)}>
                            {action.inputData?.function ?? copy.proposalActionsItem.notVerified.function}
                        </p>
                        {(!isAbiAvailable || displayValueWarning) && (
                            <Icon icon={headerIcon.icon} size="md" className={headerIcon.className} />
                        )}
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <Heading size="h5" className="truncate text-neutral-500">
                            {action.inputData?.contract ?? copy.proposalActionsItem.notVerified.contract}
                        </Heading>
                        <Heading size="h5" className="shrink-0 text-primary-400">
                            {addressUtils.truncateAddress(action.to)}
                        </Heading>
                    </div>
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent ref={contentRef} forceMount={editMode ? true : undefined}>
                <div className="flex flex-col items-start gap-y-6 self-start md:gap-y-8">
                    {displayValueWarning && (
                        <AlertCard
                            variant="critical"
                            message={copy.proposalActionsItem.nativeSendAlert}
                            description={copy.proposalActionsItem.nativeSendDescription(formattedValue)}
                        />
                    )}
                    {activeViewMode === 'BASIC' && (
                        <ProposalActionsItemBasicView
                            action={action}
                            index={index}
                            CustomComponent={CustomComponent}
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
