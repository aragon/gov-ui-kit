import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Button, DataList, Tabs } from '../../../../core';
import { type IVoteDataListItemStructureProps, VoteDataListItem } from '../../vote';
import { ProposalStatus, ProposalVoting, ProposalVotingTab } from '../index';

const meta: Meta<typeof ProposalVoting.StageContainer> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting',
    component: ProposalVoting.StageContainer,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16752-20193&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.StageContainer>;

const getTotalVotes = (votes: IVoteDataListItemStructureProps[], indicator: string) =>
    votes.reduce(
        (accumulator, { voteIndicator, votingPower }) =>
            accumulator + (voteIndicator === indicator ? Number(votingPower) : 0),
        0,
    );

const tokenVotes: IVoteDataListItemStructureProps[] = [
    {
        voter: { address: '0x17366cae2b9c6C3055e9e3C78936a69006BE5409', name: 'cgero.eth' },
        isDelegate: true,
        voteIndicator: 'yes',
        votingPower: 47289374,
        tokenSymbol: 'ARA',
    },
    {
        voter: { address: '0xd5fb864ACfD6BB2f72939f122e89fF7F475924f5', name: 'sio.eth' },
        voteIndicator: 'yes',
        votingPower: 1238948,
        tokenSymbol: 'ARA',
    },
    {
        voter: { address: '0xF6ad40D5D477ade0C640eaD49944bdD0AA1fBF05' },
        voteIndicator: 'no',
        votingPower: 849500,
        tokenSymbol: 'ARA',
    },
];

const multisigVotes: IVoteDataListItemStructureProps[] = [
    {
        voter: { address: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7', name: 'ens.eth' },
        voteIndicator: 'approve',
    },
    {
        voter: { address: '0x650235a0889CAe912673AAD13Ff75d1F1A175487' },
        voteIndicator: 'approve',
    },
    {
        voter: { address: '0xDCFfFFA68464A4AFC96EEf885844631A439cE625' },
        voteIndicator: 'approve',
    },
];

const safeBrand = { logo: 'https://app.safe.global/images/safe-logo-green.png', label: 'Safe{Wallet}' };

const TokenVotingContent: React.FC = () => (
    <>
        <ProposalVoting.BreakdownToken
            tokenSymbol="ARA"
            totalYes={getTotalVotes(tokenVotes, 'yes')}
            totalNo={getTotalVotes(tokenVotes, 'no')}
            totalAbstain={getTotalVotes(tokenVotes, 'abstain')}
            supportThreshold={50}
            minParticipation={15}
            tokenTotalSupply={9451231259}
        >
            <Button variant="primary" size="md" className="md:self-start">
                Vote on proposal
            </Button>
        </ProposalVoting.BreakdownToken>
        <ProposalVoting.Votes>
            <DataList.Root itemsCount={tokenVotes.length} entityLabel="Votes">
                <DataList.Container>
                    {tokenVotes.map((vote) => (
                        <VoteDataListItem.Structure key={vote.voter.address} {...vote} />
                    ))}
                </DataList.Container>
                <DataList.Pagination />
            </DataList.Root>
        </ProposalVoting.Votes>
        <ProposalVoting.Details
            settings={[
                { term: 'Strategy', definition: '1 Token → 1 Vote' },
                { term: 'Voting options', definition: 'Yes, Abstain, or No' },
                { term: 'Minimum support', definition: '>50%' },
                { term: 'Minimum participation (Quorum)', definition: '≥62.42K of 1M DEGEN (≥6.942)' },
                { term: 'Early execution', definition: 'Yes' },
                { term: 'Vote replacement', definition: 'No' },
                { term: 'Minimum duration', definition: '7 days' },
            ]}
        />
    </>
);

const MultisigContent: React.FC = () => (
    <>
        <ProposalVoting.BreakdownMultisig approvalsAmount={multisigVotes.length} minApprovals={4} membersCount={10} />
        <ProposalVoting.Votes>
            <DataList.Root itemsCount={multisigVotes.length} entityLabel="Votes">
                <DataList.Container>
                    {multisigVotes.map((vote) => (
                        <VoteDataListItem.Structure key={vote.voter.address} {...vote} />
                    ))}
                </DataList.Container>
                <DataList.Pagination />
            </DataList.Root>
        </ProposalVoting.Votes>
        <ProposalVoting.Details
            settings={[
                { term: 'Strategy', definition: '1 Address → 1 Vote' },
                { term: 'Voting options', definition: 'Approve' },
                { term: 'Minimum approval', definition: `4 of 5` },
            ]}
        />
    </>
);

const ExternalBodyContent: React.FC = () => (
    <>
        <Tabs.Content value={ProposalVotingTab.BREAKDOWN}>External Body Breakdown</Tabs.Content>
        <ProposalVoting.Details settings={[{ term: 'Address', definition: '0xc273…74C7' }]} />
    </>
);

/**
 * Usage example of the ProposalVoting component for simple governance proposals
 */
export const SimpleGovernance: Story = {
    args: { className: 'max-w-140' },
    render: (args) => (
        <ProposalVoting.Container
            status={ProposalStatus.ACTIVE}
            endDate={DateTime.now().plus({ days: 2 }).toMillis()}
            {...args}
        >
            <ProposalVoting.BodyContent status={ProposalStatus.ACTIVE} name="0xc273…74C7">
                <TokenVotingContent />
            </ProposalVoting.BodyContent>
        </ProposalVoting.Container>
    ),
};

/**
 * Usage example of the ProposalVoting component for single-stage proposals
 */
export const SingleStage: Story = {
    args: { className: 'max-w-140' },
    render: (args) => (
        <ProposalVoting.StageContainer {...args}>
            <ProposalVoting.Stage name="Security Council Stage" status={ProposalStatus.EXPIRED}>
                <ProposalVoting.BodyContent status={ProposalStatus.EXPIRED} name="Security Council">
                    <MultisigContent />
                </ProposalVoting.BodyContent>
            </ProposalVoting.Stage>
        </ProposalVoting.StageContainer>
    ),
};

/**
 * Usage example of the ProposalVoting component for multi-stage proposals
 */
export const MultiStage: Story = {
    args: { className: 'max-w-140' },
    render: (args) => {
        const [activeStage, setActiveStage] = useState<string | undefined>('0');

        return (
            <ProposalVoting.StageContainer {...args} activeStage={activeStage} onStageClick={setActiveStage}>
                <ProposalVoting.Stage
                    name="Token Holders Stage"
                    status={ProposalStatus.ACTIVE}
                    startDate={DateTime.now().toMillis()}
                    endDate={DateTime.now().plus({ days: 5 }).toMillis()}
                >
                    <ProposalVoting.BodyContent status={ProposalStatus.ACTIVE} name="Token Community">
                        <TokenVotingContent />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
                <ProposalVoting.Stage name="Founders Stage" status={ProposalStatus.PENDING}>
                    <ProposalVoting.BodyContent status={ProposalStatus.PENDING} name="Security Council">
                        <MultisigContent />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
                <ProposalVoting.Stage name="Safe Stage" status={ProposalStatus.PENDING}>
                    <ProposalVoting.BodyContent
                        status={ProposalStatus.PENDING}
                        name="0xd100…11E9"
                        bodyBrand={safeBrand}
                    >
                        <ExternalBodyContent />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
            </ProposalVoting.StageContainer>
        );
    },
};

/**
 * Usage example of the ProposalVoting component with multiple bodies per stage
 */
export const MultiBody: Story = {
    args: { className: 'max-w-140' },
    render: (args) => (
        <ProposalVoting.StageContainer {...args}>
            <ProposalVoting.Stage
                name="Community Stage"
                status={ProposalStatus.ACTIVE}
                startDate={DateTime.now().minus({ days: 7 }).toMillis()}
                endDate={DateTime.now().plus({ days: 10 }).toMillis()}
                bodyList={['token', 'safe']}
            >
                <ProposalVoting.BodySummary>
                    <ProposalVoting.BodySummaryList>
                        <ProposalVoting.BodySummaryListItem id="token">
                            Token Holders
                        </ProposalVoting.BodySummaryListItem>
                        <ProposalVoting.BodySummaryListItem id="safe" bodyBrand={safeBrand}>
                            Founders Approval
                        </ProposalVoting.BodySummaryListItem>
                    </ProposalVoting.BodySummaryList>
                    <p className="text-center text-neutral-500 md:text-right">
                        <span className="text-neutral-800">1 body</span> required to approve
                    </p>
                </ProposalVoting.BodySummary>
                <ProposalVoting.BodyContent name="Token Holders" status={ProposalStatus.ACTIVE} bodyId="token">
                    <TokenVotingContent />
                </ProposalVoting.BodyContent>
                <ProposalVoting.BodyContent
                    name="founders.safe.eth"
                    status={ProposalStatus.ACTIVE}
                    bodyId="safe"
                    bodyBrand={safeBrand}
                    hideTabs={[ProposalVotingTab.VOTES]}
                >
                    <ExternalBodyContent />
                </ProposalVoting.BodyContent>
            </ProposalVoting.Stage>
        </ProposalVoting.StageContainer>
    ),
};

export default meta;
