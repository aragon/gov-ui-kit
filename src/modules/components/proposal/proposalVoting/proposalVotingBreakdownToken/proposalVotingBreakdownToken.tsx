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
    /**
     * Defines if the voting is for vetoing the proposal or not.
     * @default false
     */
    isVeto?: boolean;
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
        isVeto = false,
        children,
        ...otherProps
    } = props;

    const { copy } = useGukModulesContext();

    const totalYesNumber = Number(totalYes);
    const totalNoNumber = Number(totalNo);
    const totalAbstainNumber = Number(totalAbstain);

    const optionValues = [
        {
            name: copy.proposalVotingBreakdownToken.option.yes,
            nameDescription:
                copy.proposalVotingBreakdownToken.option[isVeto ? 'vetoDescription' : 'approveDescription'],
            value: totalYesNumber,
            variant: isVeto ? 'critical' : 'success',
        },
        {
            name: copy.proposalVotingBreakdownToken.option.abstain,
            nameDescription: undefined,
            value: totalAbstainNumber,
            variant: 'default',
        },
        {
            name: copy.proposalVotingBreakdownToken.option.no,
            nameDescription:
                copy.proposalVotingBreakdownToken.option[isVeto ? 'vetoDescription' : 'approveDescription'],
            value: totalNoNumber,
            variant: isVeto ? 'success' : 'critical',
        },
    ] as const;

    const totalSupplyNumber = Number(tokenTotalSupply);

    invariant(totalSupplyNumber > 0, 'ProposalVotingBreakdownToken: tokenTotalSupply must be a positive number');

    const totalVotes = optionValues.reduce((accumulator, option) => accumulator + option.value, 0);
    const formattedTotalVotes = formatterUtils.formatNumber(totalVotes, { format: NumberFormat.GENERIC_SHORT })!;

    const minParticipationToken = (totalSupplyNumber * minParticipation) / 100;
    const formattedMinParticipationToken = formatterUtils.formatNumber(minParticipationToken, {
        format: NumberFormat.GENERIC_SHORT,
    })!;
    const minParticipationTokenPercentage = (totalVotes / minParticipationToken) * 100;

    const countableVotes = totalYesNumber + totalNoNumber;
    const formattedCountableVotes = formatterUtils.formatNumber(countableVotes, { format: NumberFormat.GENERIC_SHORT });
    const supportPercentage = countableVotes > 0 ? (totalYesNumber / countableVotes) * 100 : 0;
    const formattedTotalYes = formatterUtils.formatNumber(totalYesNumber, { format: NumberFormat.GENERIC_SHORT });

    return (
        <Tabs.Content
            value={ProposalVotingTab.BREAKDOWN}
            className={classNames('flex flex-col gap-4', className)}
            {...otherProps}
        >
            <ProposalVotingProgress.Container direction="row">
                {optionValues.map(({ name, nameDescription, variant, value }) => (
                    <ProposalVotingProgress.Item
                        key={name}
                        name={name}
                        nameDescription={nameDescription}
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
                    name={copy.proposalVotingBreakdownToken.support[isVeto ? 'nameVeto' : 'name']}
                    value={supportPercentage}
                    description={{
                        value: formattedTotalYes,
                        text: copy.proposalVotingBreakdownToken.support.description(
                            `${formattedCountableVotes!} ${tokenSymbol}`,
                        ),
                    }}
                    showPercentage={true}
                    showStatus={true}
                    thresholdIndicator={supportThreshold}
                />
                {minParticipation > 0 && (
                    <ProposalVotingProgress.Item
                        name={copy.proposalVotingBreakdownToken.minParticipation.name}
                        value={minParticipationTokenPercentage}
                        description={{
                            value: formattedTotalVotes,
                            text: copy.proposalVotingBreakdownToken.minParticipation.description(
                                `${formattedMinParticipationToken} ${tokenSymbol}`,
                            ),
                        }}
                        showPercentage={true}
                        showStatus={true}
                    />
                )}
            </ProposalVotingProgress.Container>
            {children}
        </Tabs.Content>
    );
};
