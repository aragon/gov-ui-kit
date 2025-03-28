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

    const totalYesNumber = Number(totalYes);
    const totalNoNumber = Number(totalNo);
    const totalAbstainNumber = Number(totalAbstain);

    const optionValues = [
        { name: copy.proposalVotingBreakdownToken.option.yes, value: totalYesNumber, variant: 'success' },
        { name: copy.proposalVotingBreakdownToken.option.abstain, value: totalAbstainNumber, variant: 'neutral' },
        { name: copy.proposalVotingBreakdownToken.option.no, value: totalNoNumber, variant: 'critical' },
    ] as const;

    const totalSupplyNumber = Number(tokenTotalSupply);

    invariant(totalSupplyNumber > 0, 'ProposalVotingBreakdownToken: tokenTotalSupply must be a positive number');

    const totalVotes = optionValues.reduce((accumulator, option) => accumulator + option.value, 0);
    const formattedTotalVotes = formatterUtils.formatNumber(totalVotes, { format: NumberFormat.GENERIC_SHORT })!;

    const minParticipationToken = (totalSupplyNumber * minParticipation) / 100;
    const formattedMinParticipationToken = formatterUtils.formatNumber(minParticipationToken, {
        format: NumberFormat.GENERIC_SHORT,
    })!;

    const countableVotes = totalYesNumber + totalNoNumber;
    const supportPercentage = countableVotes > 0 ? (totalYesNumber / countableVotes) * 100 : 0;
    const formattedCountableVotes = formatterUtils.formatNumber(countableVotes, { format: NumberFormat.GENERIC_SHORT });
    const formattedTotalYes = formatterUtils.formatNumber(totalYesNumber, { format: NumberFormat.GENERIC_SHORT });
    const currentParticipationPercentage = (totalVotes / minParticipationToken) * 100;

    const supportReached = supportPercentage >= supportThreshold;
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
                    value={supportPercentage}
                    description={{
                        value: formattedTotalYes,
                        text: copy.proposalVotingBreakdownToken.support.description(
                            `${formattedCountableVotes!.toString()} ${tokenSymbol}`,
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
