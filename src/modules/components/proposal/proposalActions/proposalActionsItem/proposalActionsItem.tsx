import { useMemo, useRef, useState } from 'react';
import { Accordion, AlertCard, Button, Dropdown, Heading, Icon, IconType, invariant } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import {
    ProposalActionChangeMembers,
    ProposalActionChangeSettings,
    ProposalActionTokenMint,
    ProposalActionUpdateMetadata,
    ProposalActionWithdrawToken,
} from '../proposalActionsList';

import { formatUnits } from 'viem';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerification';
import { proposalActionsUtils } from '../proposalActionsUtils';
import type { IProposalAction } from '../types';
import { ProposalActionViewMode } from '../types';
import { ProposalActionsActionDecodedView } from './proposalActionsActionDecodedView';
import { ProposalActionsActionRawView } from './proposalActionsActionRawView';
import { ProposalActionsActionViewAsMenu } from './proposalActionsActionViewAsMenu';
import type { IProposalActionsItemProps } from './proposalActionsItem.api';

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

    const ActionComponent = useMemo(() => {
        const commonProps = { index, ...web3Props };

        if (CustomComponent) {
            return <CustomComponent action={action} {...commonProps} />;
        }

        if (proposalActionsUtils.isWithdrawTokenAction(action)) {
            return <ProposalActionWithdrawToken action={action} {...commonProps} />;
        } else if (proposalActionsUtils.isTokenMintAction(action)) {
            return <ProposalActionTokenMint action={action} {...commonProps} />;
        } else if (proposalActionsUtils.isUpdateMetadataAction(action)) {
            return <ProposalActionUpdateMetadata action={action} {...commonProps} />;
        } else if (proposalActionsUtils.isChangeMembersAction(action)) {
            return <ProposalActionChangeMembers action={action} {...commonProps} />;
        } else if (proposalActionsUtils.isChangeSettingsAction(action)) {
            return <ProposalActionChangeSettings action={action} {...commonProps} />;
        }

        return null;
    }, [action, CustomComponent, web3Props, index]);

    const [viewMode, setViewMode] = useState(
        ActionComponent
            ? ProposalActionViewMode.BASIC
            : action.inputData
              ? ProposalActionViewMode.DECODED
              : ProposalActionViewMode.RAW,
    );

    const onViewModeChange = (value: ProposalActionViewMode) => {
        if (contentRef.current == null) {
            return;
        }

        const { style, scrollHeight } = contentRef.current;

        style.setProperty('--radix-collapsible-content-height', scrollHeight.toString());

        setViewMode(value);

        if (itemRef.current) {
            itemRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
    };

    // Display value warning when a transaction is sending value but it's not a native transfer (data !== '0x')
    const displayValueWarning = action.value !== '0' && action.data !== '0x';

    return (
        <Accordion.Item value={index.toString()} ref={itemRef}>
            <Accordion.ItemHeader>
                <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center gap-2">
                        <Heading size="h4" className={displayValueWarning ? '!text-critical-800' : undefined}>
                            {action.inputData == null
                                ? copy.proposalActionsAction.notVerified
                                : action.inputData.function}
                        </Heading>
                        {displayValueWarning && (
                            <Icon icon={IconType.CRITICAL} size="md" className="text-critical-500" />
                        )}
                    </div>
                    <ProposalActionsActionVerification action={action} />
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent ref={contentRef}>
                <div className="flex flex-col items-start gap-y-6 self-start md:gap-y-8">
                    {displayValueWarning && (
                        <AlertCard
                            variant="critical"
                            message={copy.proposalActionsAction.nativeSendAlert}
                            description={copy.proposalActionsAction.nativeSendDescription(
                                formatUnits(BigInt(action.value), 18),
                            )}
                        />
                    )}
                    {viewMode === ProposalActionViewMode.BASIC && ActionComponent}
                    {viewMode === ProposalActionViewMode.DECODED && (
                        <ProposalActionsActionDecodedView action={action} />
                    )}
                    {viewMode === ProposalActionViewMode.RAW && <ProposalActionsActionRawView action={action} />}

                    <div className="flex w-full flex-row justify-between">
                        <ProposalActionsActionViewAsMenu
                            disableBasic={ActionComponent == null}
                            disableDecoded={action.inputData == null}
                            viewMode={viewMode}
                            onViewModeChange={onViewModeChange}
                        />
                        {dropdownItems != null && dropdownItems.length > 0 && (
                            <Dropdown.Container
                                customTrigger={
                                    <Button variant="tertiary" size="sm" iconRight={IconType.DOTS_VERTICAL}>
                                        {copy.proposalActionsAction.dropdownLabel}
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
