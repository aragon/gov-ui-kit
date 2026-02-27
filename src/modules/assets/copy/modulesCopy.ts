/**
 * Object representing the structure of copy texts used in various parts of the GovKit Modules package.
 * Each property in the object corresponds to a specific component or feature, containing the necessary
 * text labels or functions that return text strings.
 */
export const modulesCopy = {
    addressInput: {
        clear: 'Clear',
        paste: 'Paste',
        checksum: 'Invalid checksum',
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
    actionSimulation: {
        action: 'action',
        actions: 'actions',
        totalActionsTerm: 'Total actions',
        lastSimulationTerm: 'Last simulation',
        never: 'Never',
        executableTerm: 'Executable',
        simulateAgain: 'Simulate again',
        simulate: 'Simulate',
        simulating: 'Simulating',
        viewOnTenderly: 'View on Tenderly',
        likelyToSucceed: 'Likely to succeed',
        likelyToFail: 'Likely to fail',
        unknown: 'Unknown',
    },
    proposalActionsContainer: {
        emptyHeader: 'No actions added',
    },
    proposalActionsFooter: {
        collapse: 'Collapse all',
        expand: 'Expand all',
        more: 'More',
    },
    proposalActionsItem: {
        dropdownLabel: 'More',
        nativeSendAlert: 'Proceed with caution',
        nativeSendDescription: (amount: string, symbol: string) =>
            `This action attempts to send ${amount} ${symbol}. This could cause the action to fail or result in a loss of funds.`,
        decodeWarningAlert: 'Action had issues with decoding',
        decodeWarningDescription: 'Some action fields may not be displaying properly.',
        of: 'of',
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
        noParametersMessage: 'This write function has no parameters.',
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
            UNREACHED: 'Unreached',
        },
    },
    proposalDataListItemStructure: {
        by: 'by',
        creators: 'creators',
    },
    proposalVotingTabs: {
        BREAKDOWN: 'Breakdown',
        VOTES: 'Votes',
        DETAILS: 'Settings',
    },
    proposalVotingBreakdownMultisig: {
        name: 'Approval',
        nameVeto: 'Veto',
        description: (count: string) => `of ${count} members`,
    },
    proposalVotingBreakdownToken: {
        option: {
            yes: 'Yes',
            no: 'No',
            abstain: 'Abstain',
            approveDescription: ' to approve',
            vetoDescription: ' to veto',
        },
        support: {
            name: 'Support',
            nameVeto: 'Veto support',
            description: (value: string) => `of ${value}`,
        },
        minParticipation: {
            name: 'Minimum participation',
            description: (value: string) => `of ${value}`,
        },
    },
    proposalVotingProgressItem: {
        reached: 'reached',
        unreached: 'not reached',
    },
    proposalVotingStatus: {
        main: {
            proposal: 'Proposal',
            stage: 'Stage',
        },
        secondary: {
            pending: 'is pending',
            active: 'left to vote',
            accepted: 'has been',
            executable: 'has been',
            executed: 'has been',
            rejected: 'has been',
            expired: 'has expired',
            unreached: 'not reached',
            vetoed: 'has been',
            advanceable: (canAdvance?: boolean, isShortWindow?: boolean) =>
                !canAdvance ? 'until advanceable' : isShortWindow ? 'left to advance' : 'is',
        },
        status: {
            accepted: 'accepted',
            rejected: 'rejected',
            vetoed: 'vetoed',
            advanceable: 'advanceable',
            executed: 'accepted',
            executable: 'accepted',
        },
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
    },
    wallet: {
        connect: 'Connect',
    },
    smartContractFunctionDataListItemStructure: {
        remove: 'Remove',
        notVerified: {
            function: 'Unknown',
            contract: 'Unverified contract',
        },
    },
};

export type ModulesCopy = typeof modulesCopy;
