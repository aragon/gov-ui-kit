import classNames from 'classnames';
import React from 'react';
import { normalizeExternalHref } from '../../../utils';
import { Icon, IconType } from '../../icon';
import { LinkBase } from '../linkBase';
import type { ILinkProps, LinkVariant } from './link.api';

const variantToLabelClassNames: Record<LinkVariant | 'disabled', string[]> = {
    primary: [
        'text-primary-400 cursor-pointer', // Default
        'hover:text-primary-500', // Hover state
        'active:text-primary-700', // Active state
    ],
    neutral: [
        'text-neutral-500 cursor-pointer', // Default
        'hover:text-neutral-600', // Hover state
        'active:text-neutral-800', // Active state
    ],
    disabled: ['truncate text-neutral-300'],
};

export const Link = React.forwardRef<HTMLAnchorElement, ILinkProps>((props, ref) => {
    const {
        children,
        disabled = false,
        variant = 'primary',
        href,
        isExternal = false,
        target = isExternal ? '_blank' : undefined,
        onClick,
        className,
        textClassName,
        rel,
        showUrl,
        ...otherProps
    } = props;

    const processedHref = typeof href === 'string' && isExternal ? normalizeExternalHref(href) : href;

    const processedVariant = disabled ? 'disabled' : variant;
    const linkClassName = classNames(
        'inline-flex max-w-fit flex-col gap-y-0.5 truncate rounded-md text-sm leading-tight focus-ring-primary',
        'md:gap-y-1 md:text-base',
        variantToLabelClassNames[processedVariant],
        className,
    );

    const innerTextClassName = classNames('truncate', textClassName);

    const linkRel = target === '_blank' ? `noopener noreferrer ${rel ?? ''}` : rel;

    const content = (
        <>
            <div className="flex items-center gap-x-1 md:gap-x-1.5">
                <span className={innerTextClassName}>{children}</span>
                {isExternal && <Icon icon={IconType.LINK_EXTERNAL} size="sm" />}
            </div>
            {showUrl && processedHref && (
                <p
                    className={classNames(
                        'truncate text-xs',
                        'md:text-sm',
                        disabled ? 'text-neutral-300' : 'text-neutral-400',
                    )}
                >
                    {processedHref}
                </p>
            )}
        </>
    );

    return (
        <LinkBase
            ref={ref}
            onClick={!disabled ? onClick : undefined}
            href={!disabled ? processedHref : undefined}
            className={linkClassName}
            target={target}
            rel={linkRel}
            tabIndex={disabled ? -1 : undefined}
            aria-disabled={disabled}
            {...otherProps}
        >
            {content}
        </LinkBase>
    );
});

Link.displayName = 'Link';
