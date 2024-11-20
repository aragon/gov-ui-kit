import classNames from 'classnames';
import { useRef, useState } from 'react';
import { formatUnits } from 'viem';
import { Accordion, AlertCard, Button, Dropdown, Heading, Icon, IconType, invariant } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { useGukModulesContext } from '../../../gukModulesProvider';
import type { IProposalAction } from '../proposalActionsDefinitions';
import type { IProposalActionsItemProps } from './proposalActionsItem.api';
import { ProposalActionsItemBasicView } from './proposalActionsItemBasicView';
import { ProposalActionsItemDecodedView } from './proposalActionsItemDecodedView';
import { ProposalActionsItemRawView } from './proposalActionsItemRawView';
import { proposalActionsItemUtils } from './proposalActionsItemUtils';

export enum ProposalActionViewMode {
    BASIC = 'BASIC',
    DECODED = 'DECODED',
    RAW = 'RAW',
}

export const ProposalActionsItem = <TAction extends IProposalAction = IProposalAction>(
    props: IProposalActionsItemProps<TAction>,
) => {
    const { action, index, CustomComponent, dropdownItems, ...web3Props } = props;

    invariant(
        index != null,
        'ProposalActionsItem: component must be used inside the ProposalActions.Container component to work properly.',
    );

    const { copy } = useGukModulesContext();

    const contentRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    const supportsBasicView = CustomComponent != null || proposalActionsItemUtils.isActionSupported(action);

    const [activeViewMode, setActiveViewMode] = useState(
        supportsBasicView
            ? ProposalActionViewMode.BASIC
            : action.inputData
              ? ProposalActionViewMode.DECODED
              : ProposalActionViewMode.RAW,
    );

    const onViewModeChange = (value: ProposalActionViewMode) => {
        const { style, scrollHeight = 0 } = contentRef.current ?? {};
        style?.setProperty('--radix-collapsible-content-height', scrollHeight.toString());

        setActiveViewMode(value);
        itemRef.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
    };

    // Display value warning when a transaction is sending value but it's not a native transfer (data !== '0x')
    const displayValueWarning = action.value !== '0' && action.data !== '0x';

    const headerIcon = displayValueWarning
        ? { icon: IconType.CRITICAL, className: 'text-critical-500' }
        : { icon: IconType.WARNING, className: 'text-warning-500' };

    const functionNameStyle = displayValueWarning
        ? 'text-critical-800'
        : action.inputData == null
          ? 'text-warning-800'
          : 'text-neutral-800';

    const viewModes = [
        { mode: ProposalActionViewMode.BASIC, disabled: !supportsBasicView },
        { mode: ProposalActionViewMode.DECODED, disabled: action.inputData == null },
        { mode: ProposalActionViewMode.RAW },
    ];

    return (
        <Accordion.Item value={index.toString()} ref={itemRef}>
            <Accordion.ItemHeader>
                <div className="flex flex-col items-start gap-1 md:gap-1.5">
                    <div className="flex flex-row items-center gap-2">
                        <p className={classNames('text-base font-normal leading-tight md:text-lg', functionNameStyle)}>
                            {action.inputData?.function ?? copy.proposalActionsItem.notVerified.function}
                        </p>
                        {(action.inputData == null || displayValueWarning) && (
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
            <Accordion.ItemContent ref={contentRef}>
                <div className="flex flex-col items-start gap-y-6 self-start md:gap-y-8">
                    {displayValueWarning && (
                        <AlertCard
                            variant="critical"
                            message={copy.proposalActionsItem.nativeSendAlert}
                            description={copy.proposalActionsItem.nativeSendDescription(
                                formatUnits(BigInt(action.value), 18),
                            )}
                        />
                    )}
                    {activeViewMode === ProposalActionViewMode.BASIC && (
                        <ProposalActionsItemBasicView
                            action={action}
                            index={index}
                            CustomComponent={CustomComponent}
                            {...web3Props}
                        />
                    )}
                    {activeViewMode === ProposalActionViewMode.DECODED && (
                        <ProposalActionsItemDecodedView action={action} />
                    )}
                    {activeViewMode === ProposalActionViewMode.RAW && <ProposalActionsItemRawView action={action} />}
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
