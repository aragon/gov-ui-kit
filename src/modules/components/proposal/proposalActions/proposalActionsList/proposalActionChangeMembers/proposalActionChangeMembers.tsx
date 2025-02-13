import { DefinitionList, Heading } from '../../../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../../../hooks';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import { MemberDataListItem } from '../../../../member';
import { ProposalActionType } from '../../proposalActionsDefinitions';
import type { IProposalActionChangeMembersProps } from './proposalActionChangeMembers.api';

export const ProposalActionChangeMembers: React.FC<IProposalActionChangeMembersProps> = (props) => {
    const { action, wagmiConfig, chainId } = props;
    const { copy } = useGukModulesContext();

    const { buildEntityUrl } = useBlockExplorer({ chains: wagmiConfig?.chains, chainId });

    const getMemberBlockExplorerLink = (address: string) =>
        buildEntityUrl({ type: ChainEntityType.ADDRESS, id: address });

    return (
        <div className="flex w-full flex-col gap-y-6">
            <div className="flex flex-wrap gap-2">
                {action.members.map((member) => (
                    <MemberDataListItem.Structure
                        key={member.address}
                        address={member.address}
                        ensName={member.name}
                        avatarSrc={member.avatarSrc}
                        className="grow basis-60"
                        href={getMemberBlockExplorerLink(member.address)}
                        target="_blank"
                    />
                ))}
            </div>
            <div>
                <Heading size="h3">{copy.proposalActionChangeMembers.summary}</Heading>
                <DefinitionList.Container>
                    <DefinitionList.Item
                        term={
                            action.type === ProposalActionType.ADD_MEMBERS
                                ? copy.proposalActionChangeMembers.added
                                : copy.proposalActionChangeMembers.removed
                        }
                    >
                        <p className="text-neutral-500">
                            {action.type === ProposalActionType.ADD_MEMBERS ? `+` : `-`}
                            {action.members.length} {copy.proposalActionChangeMembers.members}
                        </p>
                    </DefinitionList.Item>
                    <DefinitionList.Item term={copy.proposalActionChangeMembers.existingMembers}>
                        <p className="text-neutral-500">
                            {action.currentMembers} {copy.proposalActionChangeMembers.members}
                        </p>
                    </DefinitionList.Item>
                </DefinitionList.Container>
                <p className="text-sm text-neutral-500">{copy.proposalActionChangeMembers.blockNote}</p>
            </div>
        </div>
    );
};
