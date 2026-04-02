import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Button, DataList, Progress, Tabs } from '../../../../core';
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
        votingPower: 47_289_374,
        tokenSymbol: 'ARA',
    },
    {
        voter: { address: '0xd5fb864ACfD6BB2f72939f122e89fF7F475924f5', name: 'sio.eth' },
        voteIndicator: 'yes',
        votingPower: 1_238_948,
        tokenSymbol: 'ARA',
    },
    {
        voter: { address: '0xF6ad40D5D477ade0C640eaD49944bdD0AA1fBF05' },
        voteIndicator: 'no',
        votingPower: 849_500,
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
            minParticipation={15}
            supportThreshold={50}
            tokenSymbol="ARA"
            tokenTotalSupply={9_451_231_259}
            totalAbstain={getTotalVotes(tokenVotes, 'abstain')}
            totalNo={getTotalVotes(tokenVotes, 'no')}
            totalYes={getTotalVotes(tokenVotes, 'yes')}
        >
            <Button className="md:self-start" size="md" variant="primary">
                Vote on proposal
            </Button>
        </ProposalVoting.BreakdownToken>
        <ProposalVoting.Votes>
            <DataList.Root entityLabel="Votes" itemsCount={tokenVotes.length}>
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
        <ProposalVoting.BreakdownMultisig approvalsAmount={multisigVotes.length} membersCount={10} minApprovals={4} />
        <ProposalVoting.Votes>
            <DataList.Root entityLabel="Votes" itemsCount={multisigVotes.length}>
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
                { term: 'Minimum approval', definition: '4 of 5' },
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
            endDate={DateTime.now().plus({ days: 2 }).toMillis()}
            status={ProposalStatus.ACTIVE}
            {...args}
        >
            <ProposalVoting.BodyContent name="0xc273…74C7" status={ProposalStatus.ACTIVE}>
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
                <ProposalVoting.BodyContent name="Security Council" status={ProposalStatus.EXPIRED}>
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
                    endDate={DateTime.now().plus({ days: 5 }).toMillis()}
                    name="Token Holders Stage"
                    startDate={DateTime.now().toMillis()}
                    status={ProposalStatus.ACTIVE}
                >
                    <ProposalVoting.BodyContent name="Token Community" status={ProposalStatus.ACTIVE}>
                        <TokenVotingContent />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
                <ProposalVoting.Stage name="Founders Stage" status={ProposalStatus.PENDING}>
                    <ProposalVoting.BodyContent name="Security Council" status={ProposalStatus.PENDING}>
                        <MultisigContent />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
                <ProposalVoting.Stage name="Safe Stage" status={ProposalStatus.PENDING}>
                    <ProposalVoting.BodyContent
                        bodyBrand={safeBrand}
                        name="0xd100…11E9"
                        status={ProposalStatus.PENDING}
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
                bodyList={['token', 'safe']}
                endDate={DateTime.now().plus({ days: 10 }).toMillis()}
                name="Community Stage"
                startDate={DateTime.now().minus({ days: 7 }).toMillis()}
                status={ProposalStatus.ACTIVE}
            >
                <ProposalVoting.BodySummary>
                    <ProposalVoting.BodySummaryList>
                        <ProposalVoting.BodySummaryListItem id="token">
                            <div className="flex grow flex-col gap-3">
                                <p className="text-neutral-800">Token Holders</p>
                                <Progress thresholdIndicator={60} value={30} variant="neutral" />
                                <p className="text-neutral-800">30 of 60 ARA</p>
                            </div>
                        </ProposalVoting.BodySummaryListItem>
                        <ProposalVoting.BodySummaryListItem bodyBrand={safeBrand} id="safe">
                            Founders Approval
                        </ProposalVoting.BodySummaryListItem>
                    </ProposalVoting.BodySummaryList>
                    <p className="text-center text-neutral-500 md:text-right">
                        <span className="text-neutral-800">1 body</span> required to approve
                    </p>
                </ProposalVoting.BodySummary>
                <ProposalVoting.BodyContent bodyId="token" name="Token Holders" status={ProposalStatus.ACTIVE}>
                    <TokenVotingContent />
                </ProposalVoting.BodyContent>
                <ProposalVoting.BodyContent
                    bodyBrand={safeBrand}
                    bodyId="safe"
                    hideTabs={[ProposalVotingTab.VOTES]}
                    name="founders.safe.eth"
                    status={ProposalStatus.ACTIVE}
                >
                    <ExternalBodyContent />
                </ProposalVoting.BodyContent>
            </ProposalVoting.Stage>
        </ProposalVoting.StageContainer>
    ),
};

export default meta;
