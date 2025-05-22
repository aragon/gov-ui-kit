import type { ReactNode } from 'react';
import { Link, type ILinkProps } from '../../link';

export interface IDefinitionListItemContentProps {
    /**
     * Renders the item as a link with the provided properties when set.
     */
    link?: ILinkProps;
    /**
     * Children of the component.
     */
    children?: ReactNode;
}

export const DefinitionListItemContent: React.FC<IDefinitionListItemContentProps> = (props) => {
    const { link, children } = props;
    const { href, isExternal = true, ...otherLinkProps } = link ?? {};

    if (href == null) {
        return children;
    }

    return (
        <Link href={href} isExternal={isExternal} {...otherLinkProps}>
            {children}
        </Link>
    );
};
