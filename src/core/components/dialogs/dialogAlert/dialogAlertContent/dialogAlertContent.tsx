import classNames from 'classnames';
import type React from 'react';
import { type ComponentPropsWithoutRef } from 'react';

export interface IDialogAlertContentProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Removes the default paddings when set to true.
     * @default false
     */
    noInset?: boolean;
}

export const DialogAlertContent: React.FC<IDialogAlertContentProps> = (props) => {
    const { className, noInset = false, ...otherProps } = props;

    const contentClassNames = classNames('overflow-auto', { 'px-4 md:px-6': !noInset }, classNames);

    return <div className={contentClassNames} {...otherProps} />;
};
