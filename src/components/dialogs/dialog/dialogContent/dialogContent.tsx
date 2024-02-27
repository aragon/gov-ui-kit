import classNames from 'classnames';
import type React from 'react';
import { type ComponentPropsWithoutRef } from 'react';

export interface IDialogContentProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * `Dialog.Content` component.
 */
export const DialogContent: React.FC<IDialogContentProps> = ({ className, ...otherProps }) => {
    return <div className={classNames('overflow-auto px-4 md:px-6', className)} {...otherProps} />;
};
