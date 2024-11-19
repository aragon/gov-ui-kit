import classNames from 'classnames';
import { type ComponentPropsWithRef } from 'react';

export interface IDefinitionListItemProps extends ComponentPropsWithRef<'div'> {
    /**
     * The term to be displayed in the definition list item.
     */
    term: string;
}

export const DefinitionListItem: React.FC<IDefinitionListItemProps> = (props) => {
    const { term, children, className, ...otherProps } = props;

    return (
        <div
            className={classNames(
                'flex flex-col gap-y-2 border-b border-neutral-100 py-3 last:border-none md:grid md:grid-cols-[1fr_2fr] md:gap-x-6 md:py-4',
                className,
            )}
            {...otherProps}
        >
            <dt className="line-clamp-1 leading-tight text-neutral-800 md:line-clamp-none">{term}</dt>
            <dd className="min-w-0 leading-tight text-neutral-500">{children}</dd>
        </div>
    );
};
