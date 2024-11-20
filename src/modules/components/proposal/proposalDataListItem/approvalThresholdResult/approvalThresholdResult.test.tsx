import { render, screen } from '@testing-library/react';
import { NumberFormat, formatterUtils } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import { ApprovalThresholdResult, type IApprovalThresholdResultProps } from './approvalThresholdResult';

describe('<ApprovalThresholdResult /> component', () => {
    const createTestComponent = (props?: Partial<IApprovalThresholdResultProps>) => {
        const completeProps: IApprovalThresholdResultProps = {
            approvalAmount: 1,
            approvalThreshold: 2,
            ...props,
        };

        return <ApprovalThresholdResult {...completeProps} />;
    };

    it('renders the formatted approval threshold and approval amount and the corresponding progressbar', () => {
        const mockProps: IApprovalThresholdResultProps = {
            approvalAmount: 15000000,
            approvalThreshold: 20000000,
        };

        render(createTestComponent(mockProps));

        const expectedApproval = formatterUtils.formatNumber(mockProps.approvalAmount, {
            format: NumberFormat.GENERIC_SHORT,
        })!;

        const expectedThreshold = formatterUtils.formatNumber(mockProps.approvalThreshold, {
            format: NumberFormat.GENERIC_SHORT,
        })!;

        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toBeInTheDocument();

        const expectedPercentage = (mockProps.approvalAmount / mockProps.approvalThreshold) * 100;
        expect(progressbar.getAttribute('data-value')).toEqual(expectedPercentage.toString());

        expect(screen.getByText(expectedApproval)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.approvalThresholdResult.outOf(expectedThreshold))).toBeInTheDocument();
    });

    it('renders the stage title and stage id when provided', () => {
        const stage = {
            title: 'Test Stage',
            id: '3',
        };

        render(createTestComponent({ stage }));

        expect(screen.getByText(stage.title)).toBeInTheDocument();
        expect(screen.getByText(stage.id)).toBeInTheDocument();
    });

    it('renders the default stage title when not provided', () => {
        render(createTestComponent());

        expect(screen.getByText(/approved by/i)).toBeInTheDocument();
    });
});
