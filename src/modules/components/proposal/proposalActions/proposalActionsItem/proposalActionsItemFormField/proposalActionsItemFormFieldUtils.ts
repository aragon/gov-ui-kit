import type { IProposalActionInputDataParameter } from '../../proposalActionsDefinitions';

class ProposalActionsItemFormFieldUtils {
    getParameterLabel = ({ name, type }: IProposalActionInputDataParameter) => `${name} (${type})`;

    guardValueType = (value: unknown): value is boolean | string => ['string', 'boolean'].includes(typeof value);

    guardArrayType = (value: unknown[]): value is boolean[] | string[] =>
        value.every((item) => (Array.isArray(item) ? this.guardArrayType(item) : this.guardValueType(item)));
}

export const proposalActionsItemFormFieldUtils = new ProposalActionsItemFormFieldUtils();
