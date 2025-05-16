import classNames from 'classnames';
import React, { type ComponentPropsWithRef } from 'react';
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
    /**
     * Optional description text.
     */
    description?: string;
}

export const DefinitionListItem: React.FC<IDefinitionListItemProps> = (props) => {
    const { term, link, children, className, description, ...otherProps } = props;

    const { href, isExternal = true, ...otherLinkProps } = link ?? {};

    return (
        <div
            className={classNames(
                'flex flex-col gap-y-2 border-b border-neutral-100 py-3 last:border-none md:grid md:grid-cols-[1fr_2fr] md:gap-x-6 md:py-4',
                className,
            )}
            {...otherProps}
        >
            <dt className="line-clamp-1 leading-tight text-neutral-800 md:line-clamp-none">{term}</dt>
            <dd
                className={classNames('min-w-0 leading-tight text-neutral-500', {
                    'flex flex-col gap-y-0.5 md:gap-y-1': description != null,
                })}
            >
                {href == null && children}
                {href != null && (
                    <Link href={href} isExternal={isExternal} {...otherLinkProps}>
                        {children}
                    </Link>
                )}
                {description != null && (
                    <p className={classNames('truncate text-xs leading-normal text-neutral-400', 'md:text-sm')}>
                        {description}
                    </p>
                )}
            </dd>
        </div>
    );
};
