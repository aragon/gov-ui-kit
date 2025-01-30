import { Description } from '@radix-ui/react-dialog';
import classNames from 'classnames';
import type React from 'react';
import { type ComponentPropsWithoutRef } from 'react';

export interface IDialogContentProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Optional description of the dialog.
     */
    description?: string;
    /**
     * Removes the default paddings when set to true.
     * @default false
     */
    noInset?: boolean;
}

export const DialogContent: React.FC<IDialogContentProps> = (props) => {
    const { description, noInset = false, className, children, ...otherProps } = props;

    return (
        <div className={classNames('overflow-auto', { 'px-4 md:px-6': !noInset }, className)} {...otherProps}>
            {description && (
                <Description className="pb-3 text-sm leading-normal text-neutral-500 md:pb-4">
                    {description}
                </Description>
            )}
            {children}
        </div>
    );
};
