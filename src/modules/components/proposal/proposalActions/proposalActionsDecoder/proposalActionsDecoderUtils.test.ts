import { proposalActionsDecoderUtils } from './proposalActionsDecoderUtils';

describe('ProposalActionsDecoder utils', () => {
    describe('getFieldName', () => {
        it('prepends the formPrefix to the field name when defined', () => {
            const formPrefix = 'actions.0';
            const fieldName = 'data';
            expect(proposalActionsDecoderUtils.getFieldName(fieldName, formPrefix)).toEqual(
                `${formPrefix}.${fieldName}`,
            );
        });

        it('returns the field name when form prefix is not defined', () => {
            const fieldName = 'inputData.parameters.0.value';
            expect(proposalActionsDecoderUtils.getFieldName(fieldName, undefined)).toEqual(fieldName);
        });
    });
});
