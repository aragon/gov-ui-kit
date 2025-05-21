import classNames from 'classnames';
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
    const { className, settings, ...otherProps } = props;

    const hasSettings = settings != null && settings.length > 0;

    return (
        <Tabs.Content
            value={ProposalVotingTab.DETAILS}
            className={classNames('flex flex-col gap-3', className)}
            {...otherProps}
        >
            {hasSettings && (
                <DefinitionList.Container>
                    {settings.map(({ term, definition, link }) => (
                        <DefinitionList.Item key={term} term={term} link={link}>
                            {definition}
                        </DefinitionList.Item>
                    ))}
                </DefinitionList.Container>
            )}
        </Tabs.Content>
    );
};
