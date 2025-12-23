import type { IDefinitionListItemProps } from '../../core';

export interface IDefinitionSetting extends Pick<
    IDefinitionListItemProps,
    'term' | 'link' | 'description' | 'copyValue'
> {
    /**
     * The definition for the term in the list item.
     */
    definition?: string;
}
