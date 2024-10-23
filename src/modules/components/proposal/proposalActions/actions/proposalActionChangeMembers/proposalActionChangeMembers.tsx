import { DefinitionList, Heading } from '../../../../../../core';
import { useGukModulesContext } from '../../../../gukModulesProvider';
import { MemberDataListItem } from '../../../../member';
import {
    ProposalActionType,
    type IProposalActionChangeMembers,
    type IProposalActionComponentProps,
} from '../../proposalActionsTypes';

export interface IProposalActionChangeMembersProps
    extends IProposalActionComponentProps<IProposalActionChangeMembers> {}

export const ProposalActionChangeMembers: React.FC<IProposalActionChangeMembersProps> = (props) => {
    const { action } = props;
    const { copy } = useGukModulesContext();

    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-2 md:flex-row">
                {action.members.map((member) => (
                    <MemberDataListItem.Structure
                        key={member.address}
                        address={member.address}
                        ensName={member.name}
                        avatarSrc={member.avatarSrc}
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
