import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import { AddressOutput } from '../../addressOutput';
import { Clipboard } from '../../clipboard';
import { DefinitionListItemContent, type IDefinitionListItemContentProps } from './definitionListItemContent';

export interface IDefinitionListItemProps
    extends ComponentPropsWithRef<'div'>,
        Pick<IDefinitionListItemContentProps, 'link'> {
    /**
     * The term to be displayed in the definition list item.
     */
    term: string;
    /**
     * Renders an icon to copy the defined value on the clipboard when set. For on-chain entity items, it overrides
     * the children as the copied and revealed value.
     */
    copyValue?: string;
    /**
     * Optional description text for the definition list item.
     */
    description?: string;
}

export const DefinitionListItem: React.FC<IDefinitionListItemProps> = (props) => {
    const { term, link, copyValue, description, className, children, ...otherProps } = props;

    const onchainValue = link?.isOnchainEntity
        ? (copyValue ?? (typeof children === 'string' ? children : undefined))
        : undefined;

    const definitionContent =
        onchainValue == null ? (
            <DefinitionListItemContent link={link}>{children}</DefinitionListItemContent>
        ) : (
            <AddressOutput
                address={onchainValue}
                href={link?.href}
                isExternal={link?.isExternal}
                label={typeof children === 'string' && children !== onchainValue ? children : undefined}
            />
        );

    return (
        <div
            className={classNames(
                'flex flex-col gap-y-2 border-neutral-100 border-b py-3 last:border-none md:grid md:grid-cols-[1fr_2fr] md:gap-x-6 md:py-4',
                className,
            )}
            {...otherProps}
        >
            <dt className="line-clamp-1 text-neutral-800 leading-normal md:line-clamp-none">{term}</dt>
            <dd
                className={classNames('min-w-0 text-neutral-500 leading-normal', {
                    'flex flex-col gap-y-0.5 md:gap-y-1': description != null,
                })}
            >
                {copyValue == null || onchainValue != null ? (
                    definitionContent
                ) : (
                    <Clipboard copyValue={copyValue}>{definitionContent}</Clipboard>
                )}
                {description != null && (
                    <p className={classNames('truncate text-neutral-400 text-xs leading-normal', 'md:text-sm')}>
                        {description}
                    </p>
                )}
            </dd>
        </div>
    );
};
