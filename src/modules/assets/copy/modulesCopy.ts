/**
 * Object representing the structure of copy texts used in various parts of the ODS Modules package.
 * Each property in the object corresponds to a specific component or feature, containing the necessary
 * text labels or functions that return text strings.
 */
export const modulesCopy = {
    addressInput: {
        clear: 'Clear',
        paste: 'Paste',
    },
    assetDataListItemStructure: {
        unknown: 'Unknown',
    },
    memberDataListItemStructure: {
        yourDelegate: 'Your Delegate',
        you: 'You',
        delegations: 'Delegations',
        votingPower: 'Voting Power',
    },
    approvalThresholdResult: {
        stage: 'Stage',
        outOf: (threshold: string) => `of ${threshold} members`,
    },
    majorityVotingResult: {
        winningOption: 'Winning Option',
        stage: 'Stage',
    },
    proposalActionsContainer: {
        containerName: 'Actions',
        collapse: 'Collapse all',
        expand: 'Expand all',
    },
    proposalActionsAction: {
        notVerified: 'Not verified',
    },
    proposalActionsActionDecodedView: {
        valueHelper: "Amount of ETH to transfer in the transaction",
    },
    proposalActionsActionRawView: {
        to: 'To',
        data: 'Data',
        value: 'Value',
        copyButton: 'Copy data'
    },
    proposalActionsActionViewAsMenu: {
        basic: 'Basic',
        dropdownLabel: 'View action as',
        decoded: 'Decoded',
        raw: 'Raw',
    },
    proposalActionChangeMembers: {
        summary: 'Summary',
        added: 'Added',
        removed: 'Removed',
        members: 'members',
        adjustMemberCount: {
            addMembers: 'Add members',
            removeMembers: 'Remove members',
        },
        existingMembers: 'Existing members',
        blockNote: 'At the block in which the proposal was created',
    },
    proposalActionsChangeSettings: {
        existingToggle: 'Existing',
        proposedToggle: 'Proposed',
    },
    proposalActionsUpdateMetadata: {
        logoTerm: 'Logo',
        nameTerm: 'Name',
        linkTerm: 'Links',
        descriptionTerm: 'Description',
        existingToggle: 'Existing',
        proposedToggle: 'Proposed',
    },
    proposalActionsTokenMint: {
        summaryHeading: 'Summary',
        newTokensTerm: 'New tokens',
        newHoldersTerm: 'New holders',
        totalTokenSupplyTerm: 'Total token supply',
        totalHoldersTerm: 'Total token holders',
    },
    proposalDataListItemStatus: {
        voted: "You've voted",
        ago: 'ago',
        left: 'left',
    },
    proposalDataListItemStructure: {
        by: 'By',
        creators: 'creators',
    },
    proposalVotingTabs: {
        breakdown: 'Breakdown',
        votes: 'Votes',
        details: 'Details',
    },
    proposalVotingBreakdownMultisig: {
        name: 'Minimum Approval',
        description: (count: string | null) => `of ${count} members`,
    },
    proposalVotingBreakdownToken: {
        option: {
            yes: 'Yes',
            no: 'No',
            abstain: 'Abstain',
        },
        support: {
            name: 'Support',
            description: (value: string) => `of ${value}`,
        },
        minParticipation: {
            name: 'Minimum participation',
            description: (value: string) => `of ${value}`,
        },
    },
    proposalVotingStageStatus: {
        main: {
            proposal: 'Proposal',
            stage: 'Stage',
        },
        secondary: {
            pending: 'is pending',
            active: 'left to vote',
            accepted: 'has been',
            rejected: 'has been',
            unreached: 'not reached',
        },
        status: {
            accepted: 'accepted',
            rejected: 'rejected',
        },
    },
    proposalVotingDetails: {
        voting: 'Voting',
        governance: 'Governance',
    },
    proposalVotingStage: {
        stage: (index: number) => `Stage ${index}`,
    },
    voteDataListItemStructure: {
        yourDelegate: 'Your delegate',
        you: 'You',
    },
    voteProposalDataListItemStructure: {
        voted: 'Voted',
    },
    wallet: {
        connect: 'Connect',
    },
};

export type ModulesCopy = typeof modulesCopy;
