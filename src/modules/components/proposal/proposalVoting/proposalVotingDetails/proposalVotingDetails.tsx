import classNames from 'classnames';
import { DateFormat, DefinitionList, formatterUtils, Heading, type ITabsContentProps, Tabs } from '../../../../../core';
import type { IDefinitionSetting } from '../../../../types';
import { useGukModulesContext } from '../../../gukModulesProvider';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { useProposalVotingStageContext } from '../proposalVotingStageContext';

export interface IProposalVotingDetailsProps extends Omit<ITabsContentProps, 'value'> {
    /**
     * Governance settings displayed on the details tab.
     */
    settings?: IDefinitionSetting[];
}

export const ProposalVotingDetails: React.FC<IProposalVotingDetailsProps> = (props) => {
    const { className, settings, ...otherProps } = props;

    const { copy } = useGukModulesContext();
    const { startDate, endDate } = useProposalVotingStageContext();

    const formattedStartDate = formatterUtils.formatDate(startDate, { format: DateFormat.YEAR_MONTH_DAY_TIME }) ?? '-';
    const formattedEndDate = formatterUtils.formatDate(endDate, { format: DateFormat.YEAR_MONTH_DAY_TIME }) ?? '-';

    const hasSettings = settings != null && settings.length > 0;

    return (
        <Tabs.Content
            value={ProposalVotingTab.DETAILS}
            className={classNames('flex flex-col gap-3', className)}
            {...otherProps}
        >
            <Heading size="h3">{copy.proposalVotingDetails.voting}</Heading>
            <DefinitionList.Container>
                <DefinitionList.Item term={copy.proposalVotingDetails.starts}>
                    <p className="text-neutral-500 first-letter:capitalize">{formattedStartDate}</p>
                </DefinitionList.Item>
                <DefinitionList.Item term={copy.proposalVotingDetails.expires}>
                    <p className="text-neutral-500 first-letter:capitalize">{formattedEndDate}</p>
                </DefinitionList.Item>
            </DefinitionList.Container>
            {hasSettings && (
                <>
                    <Heading size="h3">{copy.proposalVotingDetails.governance}</Heading>
                    <DefinitionList.Container>
                        {settings.map(({ term, definition, link }) => (
                            <DefinitionList.Item key={term} term={term} link={link}>
                                {definition}
                            </DefinitionList.Item>
                        ))}
                    </DefinitionList.Container>
                </>
            )}
        </Tabs.Content>
    );
};
