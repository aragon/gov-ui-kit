import type { ReactNode } from 'react';
import { type ILinkProps, Link } from '../../link';

export interface IDefinitionListItemLinkProps extends ILinkProps {
    /**
     * Renders the item value as an address output owning the link, reveal and copy interactions. The item children
     * must be a string and are used as display label, while the value defaults to the children when copyValue is unset.
     */
    isOnchainEntity?: boolean;
}

export interface IDefinitionListItemContentProps {
    /**
     * Renders the item as a link with the provided properties when set.
     */
    link?: IDefinitionListItemLinkProps;
    /**
     * Children of the component.
     */
    children?: ReactNode;
}
export const DefinitionListItemContent: React.FC<IDefinitionListItemContentProps> = (props) => {
    const { link, children } = props;
    const { href, isExternal = true, isOnchainEntity: _isOnchainEntity, ...otherLinkProps } = link ?? {};

    if (href == null) {
        return children;
    }

    return (
        <Link href={href} isExternal={isExternal} {...otherLinkProps}>
            {children}
        </Link>
    );
};
