import { DefinitionList, type ITabsContentProps, Tabs } from '../../../../../core';
import type { IDefinitionSetting } from '../../../../types';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingDetailsProps extends Omit<ITabsContentProps, 'value'> {
    /**
     * Governance settings displayed on the details tab.
     */
    settings?: IDefinitionSetting[];
}

export const ProposalVotingDetails: React.FC<IProposalVotingDetailsProps> = (props) => {
    const { settings, ...otherProps } = props;

    return (
        <Tabs.Content value={ProposalVotingTab.DETAILS} {...otherProps}>
            <DefinitionList.Container>
                {settings?.map(({ term, definition, ...otherProps }) => (
                    <DefinitionList.Item key={term} term={term} {...otherProps}>
                        {definition}
                    </DefinitionList.Item>
                ))}
            </DefinitionList.Container>
        </Tabs.Content>
    );
};
