import classNames from 'classnames';
import { type ComponentPropsWithRef } from 'react';
import { IconType } from '../../icon';
import { Link, type ILinkProps } from '../../link';

export interface IDefinitionListItemProps extends ComponentPropsWithRef<'div'> {
    /**
     * The term to be displayed in the definition list item.
     */
    term: string;
    /**
     * The materials for a Link component if necessary.
     */
    link?: ILinkProps;
}

export const DefinitionListItem: React.FC<IDefinitionListItemProps> = (props) => {
    const { term, link, children, className, ...otherProps } = props;

    const { href, target = '_blank', iconRight = IconType.LINK_EXTERNAL, ...otherLinkProps } = link ?? {};

    return (
        <div
            className={classNames(
                'flex flex-col gap-y-2 border-b border-neutral-100 py-3 last:border-none md:grid md:grid-cols-[1fr_2fr] md:gap-x-6 md:py-4',
                className,
            )}
            {...otherProps}
        >
            <dt className="line-clamp-1 leading-tight text-neutral-800 md:line-clamp-none">{term}</dt>
            {href == null && <dd className="min-w-0 leading-tight text-neutral-500">{children}</dd>}
            {href != null && (
                <dd className="min-w-0 leading-tight text-neutral-500">
                    <Link href={href} target={target} iconRight={iconRight} {...otherLinkProps}>
                        {children}
                    </Link>
                </dd>
            )}
        </div>
    );
};
