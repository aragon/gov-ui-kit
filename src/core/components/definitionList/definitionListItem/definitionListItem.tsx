import classNames from 'classnames';
import { type ComponentPropsWithRef } from 'react';
import { Clipboard } from '../../clipboard';
import { DefinitionListItemContent, type IDefinitionListItemContentProps } from './definitionListItemContent';

export interface IDefinitionListItemProps
    extends ComponentPropsWithRef<'div'>, Pick<IDefinitionListItemContentProps, 'link'> {
    /**
     * The term to be displayed in the definition list item.
     */
    term: string;
    /**
     * Renders an icon to copy the defined value on the clipboard when set.
     */
    copyValue?: string;
    /**
     * Optional description text for the definition list item.
     */
    description?: string;
}

export const DefinitionListItem: React.FC<IDefinitionListItemProps> = (props) => {
    const { term, link, copyValue, description, className, children, ...otherProps } = props;

    return (
        <div
            className={classNames(
                'flex flex-col gap-y-2 border-b border-neutral-100 py-3 last:border-none md:grid md:grid-cols-[1fr_2fr] md:gap-x-6 md:py-4',
                className,
            )}
            {...otherProps}
        >
            <dt className="line-clamp-1 leading-normal text-neutral-800 md:line-clamp-none">{term}</dt>
            <dd
                className={classNames('min-w-0 leading-normal text-neutral-500', {
                    'flex flex-col gap-y-0.5 md:gap-y-1': description != null,
                })}
            >
                {copyValue == null && <DefinitionListItemContent link={link}>{children}</DefinitionListItemContent>}
                {copyValue != null && (
                    <Clipboard copyValue={copyValue}>
                        <DefinitionListItemContent link={link}>{children}</DefinitionListItemContent>
                    </Clipboard>
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
