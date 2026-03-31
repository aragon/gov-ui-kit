import classNames from 'classnames';
import { forwardRef } from 'react';

export type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    /**
     * Specifies the semantic level of the heading, affecting both the HTML element used (e.g., <h1>, <h2>) and its default styling.
     * If the 'as' prop is not provided, this value determines the HTML element rendered in the DOM.
     * @default h1
     */
    size?: HeadingSize;
    /**
     * Optionally overrides the HTML element type that is rendered in the DOM, independent of the heading's semantic level determined by the 'size' prop.
     * This allows for styling and semantic adjustments where necessary.
     */
    as?: HeadingSize;
}

const headingToSizeClassNames: Record<HeadingSize, string> = {
    h1: 'text-2xl md:text-3xl',
    h2: 'text-xl md:text-2xl',
    h3: 'text-lg md:text-xl',
    h4: 'text-base md:text-lg',
    h5: 'text-sm md:text-base',
};

export const Heading = forwardRef<HTMLHeadingElement, IHeadingProps>((props, ref) => {
    const { size = 'h1', as, className, ...otherProps } = props;
    const Tag = as ?? size;
    const headingClassName = classNames(
        'font-normal text-neutral-800 leading-tight',
        headingToSizeClassNames[size],
        className,
    );

    return <Tag className={headingClassName} ref={ref} {...otherProps} />;
});

Heading.displayName = 'Heading';
