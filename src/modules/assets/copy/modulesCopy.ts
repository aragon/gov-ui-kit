/**
 * Object representing the structure of copy texts used in various parts of the GovKit Modules package.
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
    proposalActionsContainer: {
        emptyHeader: 'No actions added',
    },
    proposalActionsFooter: {
        collapse: 'Collapse all',
        expand: 'Expand all',
        execution: "The proposal must pass all voting stages before the binding onchain actions are able to be executed."
    },
    proposalActionsItem: {
        dropdownLabel: 'More',
        nativeSendAlert: 'Proceed with caution',
        nativeSendDescription: (amount: string, symbol: string) =>
            `This action attempts to send ${amount} ${symbol}. This could cause the action to fail or result in a loss of funds.`,
        notVerified: {
            function: 'Unknown',
            contract: 'Unverified contract',
        },
        menu: {
            BASIC: 'Basic',
            dropdownLabel: 'View action as',
            DECODED: 'Decoded',
            RAW: 'Raw',
        },
    },
    proposalActionsDecoder: {
        copyData: 'Copy data',
        add: 'Add',
        validation: {
            required: (label: string) => `${label} is required.`,
            boolean: (label: string) => `${label} must be set to "true" or "false".`,
            address: (label: string) => `${label} is not a valid address.`,
            bytes: (label: string) => `${label} is not a valid bytes value.`,
            unsignedNumber: (label: string) => `${label} is not a valid uint value.`,
        },
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
        summaryTerm: 'Summary',
        processKeyTerm: 'Process Key',
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
        voted: 'Voted',
        ago: 'ago',
        left: 'left',
        in: 'in',
        statusLabel: {
            ACCEPTED: 'Accepted',
            ADVANCEABLE: 'Advanceable',
            ACTIVE: 'Active',
            DRAFT: 'Draft',
            EXECUTED: 'Executed',
            EXPIRED: 'Expired',
            FAILED: 'Failed',
            PENDING: 'Pending',
            EXECUTABLE: 'Executable',
            REJECTED: 'Rejected',
            VETOED: 'Vetoed',
        },
    },
    proposalDataListItemStructure: {
        by: 'by',
        creators: 'creators',
    },
    proposalVotingTabs: {
        BREAKDOWN: 'Breakdown',
        VOTES: 'Votes',
        DETAILS: 'Details',
    },
    proposalVotingBreakdownMultisig: {
        name: 'Minimum Approval',
        description: (count: string) => `of ${count} members`,
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
            expired: 'has',
            unreached: 'not reached',
            vetoed: 'has been',
        },
        status: {
            accepted: 'accepted',
            rejected: 'rejected',
            expired: 'expired',
            vetoed: 'vetoed',
        },
    },
    proposalVotingDetails: {
        voting: 'Voting',
        governance: 'Governance',
        starts: 'Starts',
        expires: 'Expires',
    },
    proposalVotingStage: {
        stage: (index: number) => `Stage ${index.toString()}`,
    },
    proposalVotingBodyContent: {
        back: 'All bodies',
    },
    voteDataListItemStructure: {
        yourDelegate: 'Your delegate',
        you: 'You',
        voted: 'Voted',
    },
    voteProposalDataListItemStructure: {
        voted: 'Voted',
    },
    wallet: {
        connect: 'Connect',
    },
};

export type ModulesCopy = typeof modulesCopy;
