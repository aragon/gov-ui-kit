/**
 * Object representing the structure of copy texts used in various parts of the GovKit Core package.
 * Each property in the object corresponds to a specific component or feature, containing the necessary
 * text labels or functions that return text strings.
 */
export const coreCopy = {
    inputContainer: {
        optionalLabel: 'Optional',
    },
    dataListFilter: {
        filter: 'Filter',
        sort: 'Sort',
        reset: 'Reset all filters',
    },
    dataListFilterStatus: {
        found: 'Found',
        loadingEntity: (entityLabel: string) => `Loading ${entityLabel}`,
        filteringEntity: (entityLabel: string) => `Filtering ${entityLabel}`,
    },
    dataListPagination: {
        more: 'More',
        outOf: ({ total, entityLabel }: { total: number; entityLabel: string }) => `of ${total} ${entityLabel}`,
    },
    inputNumberMax: {
        max: 'Max',
    },
};

export type CoreCopy = typeof coreCopy;
