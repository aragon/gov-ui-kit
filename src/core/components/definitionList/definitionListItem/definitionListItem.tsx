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
                'flex w-full flex-col items-baseline justify-between gap-y-2 border-b border-neutral-100 py-3 last:border-none md:flex md:flex-row md:gap-x-6 md:py-4',
                className,
            )}
            {...otherProps}
        >
            <dt className="line-clamp-1 shrink-0 text-base font-normal leading-relaxed text-neutral-800 md:line-clamp-6 md:w-40">
                {term}
            </dt>
            <dd className="size-full min-w-0 text-base font-normal leading-relaxed text-neutral-800">{children}</dd>
        </div>
    );
};
