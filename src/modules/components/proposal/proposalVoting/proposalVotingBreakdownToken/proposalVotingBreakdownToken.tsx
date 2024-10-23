import classNames from 'classnames';
import { type ITabsContentProps, NumberFormat, Tabs, formatterUtils, invariant } from '../../../../../core';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { ProposalVotingProgress } from '../proposalVotingProgress';

export interface IProposalVotingBreakdownTokenProps extends Omit<ITabsContentProps, 'value'> {
    /**
     * Total voting power of users that voted yes.
     */
    totalYes: number | string;
    /**
     * Total voting power of users that voted no.
     */
    totalNo: number | string;
    /**
     * Total voting power of users that voted abstain.
     */
    totalAbstain: number | string;
    /**
     * Percentage of tokens that need to vote "Yes" for a proposal to pass.
     */
    supportThreshold: number;
    /**
     * Percentage of tokens that need to participate in a vote for it to be valid.
     */
    minParticipation: number;
    /**
     * Symbol of the governance token.
     */
    tokenSymbol: string;
    /**
     * Total supply of the governance token.
     */
    tokenTotalSupply: number | string;
}

export const ProposalVotingBreakdownToken: React.FC<IProposalVotingBreakdownTokenProps> = (props) => {
    const {
        className,
        totalAbstain,
        totalNo,
        totalYes,
        supportThreshold,
        minParticipation,
        tokenSymbol,
        tokenTotalSupply,
        children,
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();

    const optionValues = [
        { name: copy.proposalVotingBreakdownToken.option.yes, value: Number(totalYes), variant: 'success' },
        { name: copy.proposalVotingBreakdownToken.option.abstain, value: Number(totalAbstain), variant: 'neutral' },
        { name: copy.proposalVotingBreakdownToken.option.no, value: Number(totalNo), variant: 'critical' },
    ] as const;

    const totalSupplyNumber = Number(tokenTotalSupply);

    invariant(totalSupplyNumber > 0, 'ProposalVotingBreakdownToken: tokenTotalSupply must be a positive number');

    const totalVotes = optionValues.reduce((accumulator, option) => accumulator + option.value, 0);
    const formattedTotalVotes = formatterUtils.formatNumber(totalVotes, { format: NumberFormat.GENERIC_SHORT });

    const minParticipationToken = (totalSupplyNumber * minParticipation) / 100;
    const formattedMinParticipationToken = formatterUtils.formatNumber(minParticipationToken, {
        format: NumberFormat.GENERIC_SHORT,
    });

    const winningOption = Math.max(...optionValues.map((option) => option.value));
    const winningOptionPercentage = totalVotes > 0 ? (winningOption / totalVotes) * 100 : 0;
    const formattedWinningOption = formatterUtils.formatNumber(winningOption, { format: NumberFormat.GENERIC_SHORT });

    const currentParticipationPercentage = (totalVotes / minParticipationToken) * 100;

    const supportReached = winningOptionPercentage >= supportThreshold;
    const minParticipationReached = currentParticipationPercentage >= minParticipation;

    return (
        <Tabs.Content
            value={ProposalVotingTab.BREAKDOWN}
            className={classNames('flex flex-col gap-4', className)}
            {...otherProps}
        >
            <ProposalVotingProgress.Container direction="row">
                {optionValues.map(({ name, variant, value }) => (
                    <ProposalVotingProgress.Item
                        key={name}
                        name={name}
                        value={totalVotes > 0 ? (value / totalVotes) * 100 : 0}
                        description={{
                            value: formatterUtils.formatNumber(value, { format: NumberFormat.GENERIC_SHORT }),
                            text: tokenSymbol,
                        }}
                        variant={variant}
                    />
                ))}
            </ProposalVotingProgress.Container>
            <ProposalVotingProgress.Container direction="col">
                <ProposalVotingProgress.Item
                    name={copy.proposalVotingBreakdownToken.support.name}
                    value={winningOptionPercentage}
                    description={{
                        value: formattedWinningOption,
                        text: copy.proposalVotingBreakdownToken.support.description(
                            `${formattedTotalVotes} ${tokenSymbol}`,
                        ),
                    }}
                    showPercentage={true}
                    showStatusIcon={true}
                    variant={supportReached ? 'primary' : 'neutral'}
                    thresholdIndicator={supportThreshold}
                />
                {minParticipation > 0 && (
                    <ProposalVotingProgress.Item
                        name={copy.proposalVotingBreakdownToken.minParticipation.name}
                        value={currentParticipationPercentage}
                        description={{
                            value: formattedTotalVotes,
                            text: copy.proposalVotingBreakdownToken.minParticipation.description(
                                `${formattedMinParticipationToken} ${tokenSymbol}`,
                            ),
                        }}
                        showPercentage={true}
                        showStatusIcon={true}
                        variant={minParticipationReached ? 'primary' : 'neutral'}
                    />
                )}
            </ProposalVotingProgress.Container>
            {children}
        </Tabs.Content>
    );
};
