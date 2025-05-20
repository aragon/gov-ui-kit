import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Button, DataList } from '../../../../core';
import { type IVoteDataListItemStructureProps, VoteDataListItem } from '../../vote';
import { ProposalStatus, ProposalVoting, ProposalVotingTab } from '../index';

const meta: Meta<typeof ProposalVoting.Container> = {
    title: 'Modules/Components/Proposal/ProposalVoting/ProposalVoting',
    component: ProposalVoting.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Governance-UI-Kit?node-id=16752-20193&m=dev',
        },
    },
};

type Story = StoryObj<typeof ProposalVoting.Container>;

const getTotalVotes = (votes: IVoteDataListItemStructureProps[], indicator: string) =>
    votes.reduce(
        (accumulator, { voteIndicator, votingPower }) =>
            accumulator + (voteIndicator === indicator ? Number(votingPower) : 0),
        0,
    );

const filterVotes = (votes: IVoteDataListItemStructureProps[], search?: string) =>
    votes.filter(
        (vote) =>
            search == null ||
            search.length === 0 ||
            vote.voter.address.includes(search) ||
            vote.voter.name?.includes(search),
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
        votingPower: 8495,
        tokenSymbol: 'ARA',
    },
    {
        voter: { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', name: 'vitalik.eth' },
        voteIndicator: 'abstain',
        votingPower: 69420000,
        tokenSymbol: 'ARA',
    },
    {
        voter: { address: '0xe11BFCBDd43745d4Aa6f4f18E24aD24f4623af04', name: 'cdixon.eth' },
        voteIndicator: 'yes',
        votingPower: 66749851,
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
    {
        voter: { address: '0x2536c09E5F5691498805884fa37811Be3b2BDdb4' },
        voteIndicator: 'approve',
    },
];

const tokenSettings = [
    { term: 'Strategy', definition: '1 Token → 1 Vote' },
    { term: 'Voting options', definition: 'Yes, Abstain, or No' },
    { term: 'Minimum support', definition: '>50%' },
    { term: 'Minimum participation (Quorum)', definition: '≥62.42K of 1M DEGEN (≥6.942)' },
    { term: 'Early execution', definition: 'Yes' },
    { term: 'Vote replacement', definition: 'No' },
    { term: 'Minimum duration', definition: '7 days' },
];

const getMultisigSettings = (minApprovals: number) => [
    { term: 'Strategy', definition: '1 Address → 1 Vote' },
    { term: 'Voting options', definition: 'Approve' },
    { term: 'Minimum approval', definition: `${minApprovals.toString()} of 5` },
];

interface TokenVotingContentProps {
    tokenSearch: string | undefined;
    setTokenSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TokenVotingContent: React.FC<TokenVotingContentProps> = (props) => {
    const { tokenSearch, setTokenSearch } = props;
    const filteredTokenVotes = filterVotes(tokenVotes, tokenSearch);

    return (
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
                <DataList.Root itemsCount={filteredTokenVotes.length} entityLabel="Votes">
                    <DataList.Filter searchValue={tokenSearch} onSearchValueChange={setTokenSearch} />
                    <DataList.Container>
                        {filteredTokenVotes.map((vote) => (
                            <VoteDataListItem.Structure key={vote.voter.address} {...vote} />
                        ))}
                    </DataList.Container>
                    <DataList.Pagination />
                </DataList.Root>
            </ProposalVoting.Votes>
            <ProposalVoting.Details settings={tokenSettings} />
        </>
    );
};

interface FoundersApprovalContentProps {
    multisigSearch: string | undefined;
    setMultisigSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
    minApprovals: number;
}

const FoundersApprovalContent: React.FC<FoundersApprovalContentProps> = (props) => {
    const { multisigSearch, setMultisigSearch, minApprovals } = props;
    const filteredVotes = filterVotes(multisigVotes, multisigSearch);

    return (
        <>
            <ProposalVoting.BreakdownMultisig approvalsAmount={multisigVotes.length} minApprovals={minApprovals} />
            <ProposalVoting.Votes>
                <DataList.Root itemsCount={filteredVotes.length} entityLabel="Votes">
                    <DataList.Filter searchValue={multisigSearch} onSearchValueChange={setMultisigSearch} />
                    <DataList.Container>
                        {filteredVotes.map((vote) => (
                            <VoteDataListItem.Structure key={vote.voter.address} {...vote} />
                        ))}
                    </DataList.Container>
                    <DataList.Pagination />
                </DataList.Root>
            </ProposalVoting.Votes>
            <ProposalVoting.Details settings={getMultisigSettings(minApprovals)} />
        </>
    );
};

/**
 * Usage example of the ProposalVoting module component for multi-stage proposals
 */
export const MultiStage: Story = {
    args: {
        className: 'max-w-140',
    },
    render: (args) => {
        const [activeStage, setActiveStage] = useState<string | undefined>('0');

        const [tokenSearch, setTokenSearch] = useState<string | undefined>('');
        const [multisigSearch, setMultisigSearch] = useState<string | undefined>('');

        const minApprovals = 4;

        return (
            <ProposalVoting.Container {...args} activeStage={activeStage} onStageClick={setActiveStage}>
                <ProposalVoting.Stage
                    name="Token holder voting"
                    status={ProposalStatus.ACTIVE}
                    startDate={DateTime.now().toMillis()}
                    endDate={DateTime.now().plus({ days: 5 }).toMillis()}
                >
                    <ProposalVoting.BodyContent status={ProposalStatus.ACTIVE}>
                        <TokenVotingContent tokenSearch={tokenSearch} setTokenSearch={setTokenSearch} />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
                <ProposalVoting.Stage
                    name="Founders approval"
                    status={ProposalStatus.PENDING}
                    startDate={DateTime.now().plus({ days: 7 }).toMillis()}
                    endDate={DateTime.now().plus({ days: 10 }).toMillis()}
                >
                    <ProposalVoting.BodyContent status={ProposalStatus.PENDING}>
                        <FoundersApprovalContent
                            multisigSearch={multisigSearch}
                            setMultisigSearch={setMultisigSearch}
                            minApprovals={minApprovals}
                        />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
            </ProposalVoting.Container>
        );
    },
};

/**
 * Usage example of the ProposalVoting module component for single-stage proposals
 */
export const SingleStage: Story = {
    args: {
        className: 'max-w-140',
    },
    render: (args) => {
        const [tokenSearch, setTokenSearch] = useState<string | undefined>('');

        return (
            <ProposalVoting.Container {...args}>
                <ProposalVoting.Stage
                    name="Token holder voting"
                    status={ProposalStatus.ACTIVE}
                    startDate={DateTime.now().toMillis()}
                    endDate={DateTime.now().plus({ hours: 7 }).toMillis()}
                >
                    <ProposalVoting.BodyContent status={ProposalStatus.ACTIVE}>
                        <TokenVotingContent tokenSearch={tokenSearch} setTokenSearch={setTokenSearch} />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
            </ProposalVoting.Container>
        );
    },
};

/**
 * Usage example of the ProposalVoting module component for single-stage proposals with an external body
 */
export const SingleStageExternal: Story = {
    args: {
        className: 'max-w-[560px]',
    },
    render: (args) => {
        const [search, setSearch] = useState<string | undefined>('');

        const minApprovals = 5;

        const safeExample = {
            logo: 'https://app.safe.global/images/safe-logo-green.png',
            label: 'Safe{Wallet}',
        };

        return (
            <ProposalVoting.Container {...args}>
                <ProposalVoting.Stage
                    name="Founders approval"
                    status={ProposalStatus.ACTIVE}
                    startDate={DateTime.now().toMillis()}
                    endDate={DateTime.now().plus({ hours: 7 }).toMillis()}
                >
                    <ProposalVoting.BodyContent
                        status={ProposalStatus.ACTIVE}
                        hideTabs={[ProposalVotingTab.VOTES]}
                        bodyBrand={safeExample}
                        name="0x1234...4040"
                    >
                        <FoundersApprovalContent
                            multisigSearch={search}
                            setMultisigSearch={setSearch}
                            minApprovals={minApprovals}
                        />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
            </ProposalVoting.Container>
        );
    },
};

/**
 * Usage example of the ProposalVoting module component for single stage with multi body
 */
export const SingleStageMultiBody: Story = {
    args: {
        className: 'max-w-140',
    },
    render: (args) => {
        const bodyList = ['Token holder voting', 'Founders approval'];
        const [tokenSearch, setTokenSearch] = useState<string | undefined>('');
        const [multisigSearch, setMultisigSearch] = useState<string | undefined>('');

        const minApprovals = 5;

        const safeExample = {
            logo: 'https://app.safe.global/images/safe-logo-green.png',
            label: 'Safe{Wallet}',
        };

        return (
            <ProposalVoting.Container {...args}>
                <ProposalVoting.Stage
                    name="Token holder voting"
                    status={ProposalStatus.ACTIVE}
                    startDate={DateTime.now().toMillis()}
                    endDate={DateTime.now().plus({ days: 5 }).toMillis()}
                    bodyList={bodyList}
                >
                    <ProposalVoting.BodySummary>
                        <ProposalVoting.BodySummaryList>
                            {bodyList.map((bodyId) => (
                                <ProposalVoting.BodySummaryListItem
                                    key={bodyId}
                                    id={bodyId}
                                    bodyBrand={bodyId === 'Founders approval' ? safeExample : undefined}
                                >
                                    {bodyId}
                                </ProposalVoting.BodySummaryListItem>
                            ))}
                        </ProposalVoting.BodySummaryList>
                        <p className="text-center text-neutral-500 md:text-right">
                            <span className="text-neutral-800">1 body</span> required to approve
                        </p>
                    </ProposalVoting.BodySummary>
                    <ProposalVoting.BodyContent
                        name="Token holder voting"
                        status={ProposalStatus.ACTIVE}
                        bodyId="Token holder voting"
                    >
                        <TokenVotingContent tokenSearch={tokenSearch} setTokenSearch={setTokenSearch} />
                    </ProposalVoting.BodyContent>
                    <ProposalVoting.BodyContent
                        name="Founders approval"
                        status={ProposalStatus.ACTIVE}
                        bodyId="Founders approval"
                        bodyBrand={safeExample}
                        hideTabs={[ProposalVotingTab.VOTES]}
                    >
                        <FoundersApprovalContent
                            multisigSearch={multisigSearch}
                            setMultisigSearch={setMultisigSearch}
                            minApprovals={minApprovals}
                        />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
            </ProposalVoting.Container>
        );
    },
};

/**
 * Usage example of the ProposalVoting module component for multi stage with multi body
 */
export const MultiStageMultiBody: Story = {
    args: {
        className: 'max-w-140',
    },
    render: (args) => {
        const bodyList = ['multisig'];
        const bodyList2 = ['Token holder voting', 'Founders approval'];
        const [activeStage, setActiveStage] = useState<string | undefined>('0');
        const [tokenSearch, setTokenSearch] = useState<string | undefined>('');
        const [multisigSearch, setMultisigSearch] = useState<string | undefined>('');

        const minApprovals = 5;

        const safeExample = {
            logo: 'https://app.safe.global/images/safe-logo-green.png',
            label: 'Safe{Wallet}',
        };

        return (
            <ProposalVoting.Container {...args} activeStage={activeStage} onStageClick={setActiveStage}>
                <ProposalVoting.Stage
                    name="Security council"
                    status={ProposalStatus.ACTIVE}
                    startDate={DateTime.now().toMillis()}
                    endDate={DateTime.now().plus({ days: 5 }).toMillis()}
                    bodyList={bodyList}
                >
                    <ProposalVoting.BodyContent
                        name="0x1234...4040"
                        status={ProposalStatus.ACTIVE}
                        bodyId="multisig"
                        hideTabs={[ProposalVotingTab.VOTES]}
                        bodyBrand={safeExample}
                    >
                        <FoundersApprovalContent
                            multisigSearch={multisigSearch}
                            setMultisigSearch={setMultisigSearch}
                            minApprovals={minApprovals}
                        />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
                <ProposalVoting.Stage
                    name="Founders approval"
                    status={ProposalStatus.PENDING}
                    startDate={DateTime.now().plus({ days: 7 }).toMillis()}
                    endDate={DateTime.now().plus({ days: 10 }).toMillis()}
                    bodyList={bodyList2}
                >
                    <ProposalVoting.BodySummary>
                        <ProposalVoting.BodySummaryList>
                            {bodyList2.map((bodyId) => (
                                <ProposalVoting.BodySummaryListItem key={bodyId} id={bodyId}>
                                    {bodyId}
                                </ProposalVoting.BodySummaryListItem>
                            ))}
                        </ProposalVoting.BodySummaryList>
                        <p className="text-center text-neutral-500 md:text-right">
                            <span className="text-neutral-800">1 body</span> required to approve
                        </p>
                    </ProposalVoting.BodySummary>
                    <ProposalVoting.BodyContent
                        name="Token holder voting"
                        status={ProposalStatus.PENDING}
                        bodyId="Token holder voting"
                    >
                        <TokenVotingContent tokenSearch={tokenSearch} setTokenSearch={setTokenSearch} />
                    </ProposalVoting.BodyContent>
                    <ProposalVoting.BodyContent
                        name="Founders approval"
                        status={ProposalStatus.PENDING}
                        bodyId="Founders approval"
                    >
                        <FoundersApprovalContent
                            multisigSearch={multisigSearch}
                            setMultisigSearch={setMultisigSearch}
                            minApprovals={minApprovals}
                        />
                    </ProposalVoting.BodyContent>
                </ProposalVoting.Stage>
            </ProposalVoting.Container>
        );
    },
};

export default meta;
