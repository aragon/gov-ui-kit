import { invariant, invariantError } from './invariant';

describe('invariant utils', () => {
    it('does not throw error on condition success', () => {
        const condition = 'long-string'.length > 5;
        expect(() => invariant(condition, 'error')).not.toThrow();
    });

    it('throws invariant error on condition error', () => {
        const condition = 'short'.length > 10;
        const error = 'oops';
        const expectedError = new Error(error);
        expectedError.name = invariantError;
        expect(() => invariant(condition, error)).toThrow(new Error(error));
    });
});
