import classNames from 'classnames';
import type React from 'react';
import { type ComponentPropsWithoutRef } from 'react';

export interface IDialogContentProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Removes the default paddings when set to true.
     * @default false
     */
    noInset?: boolean;
}

export const DialogContent: React.FC<IDialogContentProps> = (props) => {
    const { noInset = false, className, children, ...otherProps } = props;

    return (
        <div className={classNames('overflow-auto', { 'px-4 md:px-6': !noInset }, className)} {...otherProps}>
            {children}
        </div>
    );
};
