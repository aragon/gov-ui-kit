import type { IDefinitionListItemProps } from '../../core';

export interface IDefinitionSetting extends Pick<IDefinitionListItemProps, 'term' | 'link'> {
    /**
     * The definition for the term in the list item.
     */
    definition?: string;
}
