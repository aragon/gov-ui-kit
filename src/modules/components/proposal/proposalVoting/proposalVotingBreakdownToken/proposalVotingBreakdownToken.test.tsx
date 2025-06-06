import { render, screen, within } from '@testing-library/react';
import { NumberFormat, Tabs, formatterUtils } from '../../../../../core';
import { testLogger } from '../../../../../core/test';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { type IProposalVotingBreakdownTokenProps, ProposalVotingBreakdownToken } from './proposalVotingBreakdownToken';

describe('<ProposalVotingBreakdownToken /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingBreakdownTokenProps>) => {
        const completeProps: IProposalVotingBreakdownTokenProps = {
            totalAbstain: 0,
            totalNo: 0,
            totalYes: 0,
            minParticipation: 1,
            supportThreshold: 0,
            tokenSymbol: '',
            tokenTotalSupply: 1,
            ...props,
        };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.BREAKDOWN}>
                <ProposalVotingBreakdownToken {...completeProps} />
            </Tabs.Root>
        );
    };

    it('renders a breakdown tab', () => {
        render(createTestComponent());
        const tabPabel = screen.getByRole('tabpanel');
        expect(tabPabel).toBeInTheDocument();
        expect(tabPabel.id).toContain(ProposalVotingTab.BREAKDOWN);
    });

    it('throws error when tokenTotalSupply is set to 0', () => {
        testLogger.suppressErrors();
        const tokenTotalSupply = 0;
        expect(() => render(createTestComponent({ tokenTotalSupply }))).toThrow();
    });

    it('renders a progress and proper description for each option based on the current votes and total votes', () => {
        const totalYes = 7000;
        const totalNo = 2000;
        const totalAbstain = 1000;
        const totalVotes = totalYes + totalAbstain + totalNo;
        const supportThreshold = 45;
        render(createTestComponent({ totalYes, totalNo, totalAbstain, supportThreshold }));

        const options = [
            { label: 'Yes', value: totalYes },
            { label: 'Abstain', value: totalAbstain },
            { label: 'No', value: totalNo },
        ];

        options.forEach((option, index) => {
            const progressbars = screen.getAllByRole('progressbar');
            // eslint-disable-next-line testing-library/no-node-access
            const element = progressbars[index].closest('[role="tabpanel"]')!;
            const scoped = within(element as HTMLElement);

            const progressbar = progressbars[index];
            const progressbarValue = ((option.value / totalVotes) * 100).toString();
            const progressbarText = formatterUtils.formatNumber(option.value, { format: NumberFormat.GENERIC_SHORT })!;

            expect(scoped.getByText(option.label)).toBeInTheDocument();
            expect(progressbar.dataset.value).toEqual(progressbarValue);
            expect(scoped.getAllByText(progressbarText).length).toBeGreaterThan(0);
        });

        expect(screen.getAllByText('to approve').length).toBe(2);
    });

    it('renders the veto name description when isVeto is true', () => {
        render(createTestComponent({ isVeto: true }));
        expect(screen.getAllByText('to veto').length).toBe(2);
    });

    it('correctly renders the support percentage and indicator', () => {
        const totalYes = 2400;
        const totalNo = 5000;
        const totalAbstain = 2600;
        const supportThreshold = 15;
        const tokenSymbol = 'TTT';

        render(createTestComponent({ totalAbstain, totalNo, totalYes, supportThreshold, tokenSymbol }));

        const countableVotes = totalYes + totalNo;
        const supportPercentage = (totalYes / countableVotes) * 100;
        const formattedYes = formatterUtils.formatNumber(totalYes, { format: NumberFormat.GENERIC_SHORT })!;
        const formattedCountable = formatterUtils.formatNumber(countableVotes, { format: NumberFormat.GENERIC_SHORT })!;
        const percentagePattern = new RegExp(`^${Math.round(supportPercentage).toString()}(\\.\\d)?%$`);

        const progressbars = screen.getAllByRole('progressbar');
        const progressbar = progressbars[3];
        // eslint-disable-next-line testing-library/no-node-access
        const element = progressbar.closest('[role="tabpanel"]')!;
        const scoped = within(element as HTMLElement);

        expect(scoped.getByText('Support')).toBeInTheDocument();
        expect(scoped.getByText((text) => percentagePattern.test(text))).toBeInTheDocument();
        expect(progressbar.dataset.value).toEqual(supportPercentage.toString());
        expect(scoped.getByTestId('progress-indicator').dataset.value).toEqual(supportThreshold.toString());
        expect(scoped.getAllByText(formattedYes).length).toBeGreaterThan(0);
        expect(scoped.getByText(`of ${formattedCountable} ${tokenSymbol}`)).toBeInTheDocument();
    });

    it('correctly renders Veto support label', () => {
        render(createTestComponent({ isVeto: true }));
        expect(screen.getByText('Veto support')).toBeInTheDocument();
    });

    it('correctly renders the details for the minimum participation', () => {
        const totalYes = 2400;
        const totalNo = 5000;
        const totalAbstain = 2600;
        const tokenTotalSupply = totalYes + totalNo + totalAbstain;
        const minParticipation = 50;
        const tokenSymbol = 'TTT';

        render(
            createTestComponent({ totalAbstain, totalNo, totalYes, minParticipation, tokenTotalSupply, tokenSymbol }),
        );

        const progressbars = screen.getAllByRole('progressbar');
        const progressbar = progressbars[4];
        // eslint-disable-next-line testing-library/no-node-access
        const element = progressbar.closest('[role="tabpanel"]')!;
        const scoped = within(element as HTMLElement);

        expect(scoped.getByText('Minimum participation')).toBeInTheDocument();
        expect(scoped.getByText('200%')).toBeInTheDocument();
        expect(progressbar.dataset.value).toEqual('100');

        const formattedTotal = formatterUtils.formatNumber(totalNo + totalYes + totalAbstain, {
            format: NumberFormat.GENERIC_SHORT,
        })!;
        const formattedMinParticipation = formatterUtils.formatNumber((tokenTotalSupply * minParticipation) / 100, {
            format: NumberFormat.GENERIC_SHORT,
        })!;

        expect(scoped.getByText(formattedTotal)).toBeInTheDocument();
        expect(scoped.getByText(`of ${formattedMinParticipation} ${tokenSymbol}`)).toBeInTheDocument();
    });

    it('hides the minimum participation details when minParticipation prop is set to 0', () => {
        const minParticipation = 0;
        render(createTestComponent({ minParticipation }));
        expect(screen.queryByText('Minimum participation')).not.toBeInTheDocument();
    });
});
